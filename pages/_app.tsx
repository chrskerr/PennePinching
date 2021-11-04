
import { ReactElement, useState, useEffect, createContext } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Image from 'next/image'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { ApolloProvider, InMemoryCache, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist";
import localforage from "localforage";

import { Space, Row, Col, Menu, Typography, Modal, Form, Input, Button } from "antd";
import { DotChartOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { Head } from "next/document";
const { Title, Text } = Typography;

import 'antd/dist/antd.css';

const firebaseConfig = {
	apiKey: "AIzaSyCQj8TxcSIRvXVOfZyWwbWe1w11cxxFiIw",
	authDomain: "penne-pinching.firebaseapp.com",
	databaseURL: "https://penne-pinching.firebaseio.com",
	projectId: "penne-pinching",
	storageBucket: "penne-pinching.appspot.com",
	messagingSenderId: "305728508038",
	appId: "1:305728508038:web:ab5a360f93018d34fac107",
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

fetch("https://penne-pinching.herokuapp.com/");

interface IAuthState {
	token: string | null;
	isAuthenticating: boolean;
	updateAuth: (p: Partial<IAuthState>) => void;
	signIn: (e: string, p: string) => void;
	signOut: () => void;
}

export const Auth = createContext<IAuthState>({
	token: null,
	isAuthenticating: false,
	updateAuth: () => { },
	signIn: () => { },
	signOut: () => { },
});

export default function App ({ Component, pageProps }: AppProps): ReactElement {
	const [ client, setClient ] = useState<ApolloClient<NormalizedCacheObject>>();
	const [ persistor, setPersistor ] = useState<CachePersistor<NormalizedCacheObject>>();

	const [ auth, setAuth ] = useState<IAuthState>({
		token: null,
		isAuthenticating: true,
		updateAuth: (payload: Partial<IAuthState>) => setAuth((auth: IAuthState) => ({ ...auth, ...payload })),
		signIn: async (email: string, password: string) => await signInWithEmailAndPassword(firebaseAuth, email, password),
		signOut: () => {
			signOut(firebaseAuth);
			if (persistor) persistor.purge();
		},
	});
	const { token, updateAuth } = auth;

	useEffect(() => {
		async function init() {
			const cache = new InMemoryCache();
			const newPersistor = new CachePersistor({
				storage: new LocalForageWrapper(localforage),
				debug: false,
				trigger: "write",
				cache,
			});
			await newPersistor.restore();
			setPersistor(newPersistor);
			setClient(
				new ApolloClient({
					uri: "https://penne-pinching.herokuapp.com/v1/graphql",
					headers: token
						? { Authorization: `Bearer ${token}` }
						: {},
					cache,
				}),
			);
		}

		init().catch(console.error);
	}, [ token ]);


	useEffect(() => {
		return onAuthStateChanged(firebaseAuth, async user => {
			if (user) {
				const token = await user.getIdToken();
				const idTokenResult = await user.getIdTokenResult();
				const hasuraClaim = idTokenResult.claims[ "https://hasura.io/jwt/claims" ];
				if (hasuraClaim) {
					updateAuth({ token });
				} else {
					updateAuth({ token: null });
				}
			} else {
				updateAuth({ token: null });
			}
			updateAuth({ isAuthenticating: false });
		});
	}, []);

	const router = useRouter()
	const [ modal, setModal ] = useState(false);
	const [ formData, setFormData ] = useState<{ email: string, password: string }>({ email: "", password: "" });
	const [ loginError, setLoginError ] = useState<string>();
	const [ loading, setLoading ] = useState(false);

	const onNavClick = (key: string) => {
		if (key === "add") router.push("/add");
		if (key === "analytics") router.push("/");
		if (key === "login") setModal(true);
		if (key === "logout") auth.signOut();
	};

	const handleLogin = async () => {
		setLoginError(undefined);
		setLoading(true);
		const { email, password } = formData;
		try {
			auth.signIn(email, password);
			setModal(false);
		}
		catch (e) {
			const err = e as { message: string }
			setLoginError(err?.message);
			setFormData({ ...formData, password: "" });
		}
		finally {
			setLoading(false);
		}
	};

	if (!client) return <div></div>;

	return (<>
		<Head>
			<title>Penne Pinchign</title>
			<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
		</Head>
		<div id="app">
			<Auth.Provider value={auth}>
				<ApolloProvider client={client}>
					<Space direction="vertical" size="middle" style={{ width: "100%" }} >
						<Row align='middle' justify="start">
							<Col sm={{ span: 2, offset: 1 }} xs={{ span: 4, offset: 1 }} >
								<Image src='/public/logo.png' layout="fill" alt="Site logo, knife and fork" />
							</Col>
							<Col sm={20} xs={18}>
								<Title style={{ marginBottom: "0" }}>Penne Pinching</Title>
							</Col>
						</Row>

						<Row>
							<Col span={24}>
								<Menu selectedKeys={[ router.pathname ]} mode="horizontal" onClick={({ key }) => onNavClick(key)}>
									<Menu.Item key="/add">
										<PlusOutlined />Add
									</Menu.Item>
									<Menu.Item key="/">
										<DotChartOutlined />Analytics
									</Menu.Item>
									{!!token ?
										<Menu.Item key="logout">Log out</Menu.Item> :
										<Menu.Item key="login">Log in</Menu.Item>
									}
								</Menu>
							</Col>
						</Row>

						<Row justify="center">
							<Col span={20}>
								<Component {...pageProps} />
							</Col>
						</Row>
					</Space>
					<Modal
						title="Log In"
						visible={modal}
						onCancel={() => setModal(false)}
						footer={null}
					>
						<Form onFinish={handleLogin}>
							<Form.Item label="Email">
								<Input
									onChange={e => setFormData({ ...formData, email: e.target.value })}
									value={formData.email}
									autoFocus
								/>
							</Form.Item>
							<Form.Item label="Password">
								<Input.Password
									onChange={e => setFormData({ ...formData, password: e.target.value })}
									value={formData.password}
								/>
							</Form.Item>
							<Button loading={loading} icon={<CheckOutlined />} htmlType="submit">Submit</Button>
							{loginError && <Row><Text type="danger">{loginError}</Text></Row>}
						</Form>
					</Modal>
				</ApolloProvider>
			</Auth.Provider>
		</div>
	</>);
}
