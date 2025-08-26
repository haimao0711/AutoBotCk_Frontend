import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useContext, useState, useEffect } from 'react';
import AuthContext from '@context/authContext';
import useDarkMode from '@hooks/useDarkMode';
import { useFormik } from 'formik';
import classNames from 'classnames';
import PageWrapper from '@layout/PageWrapper/PageWrapper';
import Page from '@layout/Page/Page';
import Card, { CardBody } from '@components/bootstrap/Card';
import Link from 'next/link';
import Logo from '@components/Logo';
import Button from '@components/bootstrap/Button';
import FormGroup from '@components/bootstrap/forms/FormGroup';
import Input from '@components/bootstrap/forms/Input';
import PropTypes from 'prop-types';
import { authService } from '@services/index';
import { useToasts } from 'react-toast-notifications';
import Toasts from '@components/bootstrap/Toasts';
import useLoading from '@hooks/useLoading';
import md5 from 'crypto-js/md5';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

const Login: NextPage = () => {
	const router = useRouter();
	const { setLoading } = useLoading();
	const { addToast } = useToasts();
	const { setUserName, setEmail, setIsLogin } = useContext(AuthContext);
	const { darkModeStatus } = useDarkMode();
	const [isRegister, setIsRegister] = useState(false);

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [has2FA, setHas2FA] = useState(false);
	// const { isLogin } = useContext(AuthContext);
	// useEffect(() => {
	// 	if (isLogin === 'true' && router.isReady) {
	// 		setTimeout(() => router.push('/overview'), 0);
	// 	}
	// }, [isLogin, router, router.isReady]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginEmail: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errors: { loginEmail?: string; loginPassword?: string; twoFactorCode?: string } =
				{};

			if (!values.loginEmail) {
				errors.loginEmail = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const data = await authService.login({
					username: values.loginEmail,
					password: values.loginPassword,
				});
				if (data?.userName) {
					setIsLogin('true');
					setUserName(data?.userName);
					setEmail(values.loginEmail);
					addToast(
						<Toasts title='Thông báo' icon='OfflineBolt' iconColor='success' isDismiss>
							Đăng nhập thành công.
						</Toasts>,
						{
							autoDismiss: true,
						},
					);
					if (router.isReady) {
						router.replace('/overview');
					}
				} else {
					addToast(
						<Toasts title='Thông báo ' icon='Cancel' iconColor='danger' isDismiss>
							Đăng nhập thất bại, vui lòng thử lại.
						</Toasts>,
						{
							autoDismiss: true,
						},
					);
				}
			} catch (e: any) {
				if (e.errors[0] === 'REQUEST.REQUIRE_2FA_CODE') {
					e.message = 'Two FA is enabled!';
					setHas2FA(() => true);
				}

				addToast(
					<Toasts title='Thông báo' iconColor='danger' icon='Cancel' isDismiss>
						{e?.message ?? 'Đăng nhập thất bại, vui lòng thử lại.'}
					</Toasts>,
					{
						autoDismiss: true,
					},
				);
			} finally {
				setLoading(false);
			}
		},
	});
	const formikRegister = useFormik({
		enableReinitialize: true,
		initialValues: {
			username: '',
			registerPassword: '',
			confirmPassword: '',
			account_name: '',
			account_num: '',
			account_password: '',
			role: 'User', // Mặc định là người dùng bình thường
		},
		validate: (values) => {
			const errors: {
				username?: string;
				registerPassword?: string;
				confirmPassword?: string;
				account_name?: string;
				account_num?: string;
				account_password?: string;
			} = {};

			if (!values.username) {
				errors.username = 'Required';
			}

			if (!values.registerPassword) {
				errors.registerPassword = 'Required';
			} else if (values.registerPassword.length < 8) {
				errors.registerPassword = 'Mật khẩu phải có ít nhất 8 ký tự';
			}

			if (values.registerPassword !== values.confirmPassword) {
				errors.confirmPassword = 'Passwords không khớp';
			}
			if (!values.account_name) {
				errors.account_name = 'Không được bỏ trống';
			}
			if (!values.account_num) {
				errors.account_num = 'Không được bỏ trống';
			}
			if (!values.account_password) {
				errors.account_password = 'Không được bỏ trống';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const data = await authService.register({
					username: values.username,
					password: values.registerPassword, // Băm MD5 mật khẩu đăng ký
					account_name: values.account_name,
					account_num: values.account_num,
					account_password: md5(values.account_password).toString(), // Băm MD5 mật khẩu tài khoản
					role: values.role,
				});

				if (data?.userName) {
					addToast(
						<Toasts title='Thông báo' icon='CheckCircle' iconColor='success' isDismiss>
							Đăng ký thành công.
						</Toasts>,
						{
							autoDismiss: true,
						},
					);
					setIsRegister(false);
					// router.push('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
				} else {
					addToast(
						<Toasts title='Thông báo' icon='Cancel' iconColor='danger' isDismiss>
							Đăng ký thất bại, vui lòng thử lại.
						</Toasts>,
						{
							autoDismiss: true,
						},
					);
				}
			} catch (e: any) {
				addToast(
					<Toasts title='Thông báo' icon='Cancel' iconColor='danger' isDismiss>
						{e?.message ?? 'Đăng ký thất bại, vui lòng thử lại.'}
					</Toasts>,
					{
						autoDismiss: true,
					},
				);
			} finally {
				setLoading(false);
			}
		},
	});

	const handleGet2FACode = async () => {
		setLoading(true);
		try {
			await authService.get2FACode({
				email: formik?.values.loginEmail,
				type: 'change-2fa',
			});
			addToast(
				<Toasts
					title='Login notifications'
					icon='OfflineBolt'
					iconColor='success'
					isDismiss>
					Send 2FA code is successful, please check your email.
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		} catch (e: any) {
			addToast(
				<Toasts title='2FA notifications' iconColor='danger' icon='Cancel' isDismiss>
					{e?.message ?? 'Send 2FA code is failed, please try again.'}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		} finally {
			setLoading(false);
		}
	};
	return (
		<PageWrapper
			isProtected={false}
			className={classNames({
				'bg-dark': darkModeStatus,
				'bg-light': !darkModeStatus,
			})}>
			<Head>
				<title>{isRegister ? 'Register' : 'Login'}</title>
			</Head>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										href='/'
										className={classNames(
											'text-decoration-none fw-bold display-2',
											{
												'text-dark': darkModeStatus,
												'text-light': !darkModeStatus,
											},
										)}></Link>
								</div>
								<LoginHeader isNewUser={isRegister} />

								{!isRegister ? (
									// Login Form
									<form className='row g-4'>
										<div className='col-12'>
											<FormGroup id='loginEmail' isFloating label='Your name'>
												<Input
													autoComplete='username'
													value={formik?.values.loginEmail}
													isTouched={formik?.touched.loginEmail}
													invalidFeedback={formik?.errors.loginEmail}
													isValid={formik?.isValid}
													onChange={formik?.handleChange}
													onBlur={formik?.handleBlur}
													onFocus={() => formik.setErrors({})}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='loginPassword'
												isFloating
												label='Password'>
												<Input
													type='password'
													autoComplete='current-password'
													value={formik?.values.loginPassword}
													isTouched={formik?.touched.loginPassword}
													invalidFeedback={formik?.errors.loginPassword}
													isValid={formik?.isValid}
													onChange={formik?.handleChange}
													onBlur={formik?.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12 d-flex gap-2'>
											<Button
												color='warning'
												className='w-100 py-3'
												onClick={formik?.handleSubmit}>
												Đăng nhập
											</Button>
											<Button
												color='warning'
												className='w-100 py-3'
												onClick={() => setIsRegister(true)}>
												Đăng ký
											</Button>
										</div>
									</form>
								) : (
									// Register Form
									<form className='row g-4'>
										<div className='col-12'>
											<FormGroup
												id='registerEmail'
												isFloating
												label='Your name'>
												<Input
													name='username'
													autoComplete='username'
													value={formikRegister?.values.username}
													isTouched={formikRegister?.touched.username}
													invalidFeedback={
														formikRegister?.errors.username
													}
													isValid={formikRegister?.isValid}
													onChange={formikRegister?.handleChange}
													onBlur={formikRegister?.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='registerPassword'
												isFloating
												label='Password'>
												<Input
													type='password'
													value={formikRegister?.values.registerPassword}
													isTouched={
														formikRegister?.touched.registerPassword
													}
													invalidFeedback={
														formikRegister?.errors.registerPassword
													}
													isValid={formikRegister?.isValid}
													onChange={formikRegister?.handleChange}
													onBlur={formikRegister?.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='confirmPassword'
												isFloating
												label='Confirm Password'>
												<Input
													type='password'
													name='confirmPassword'
													value={formikRegister.values.confirmPassword}
													isTouched={
														formikRegister.touched.confirmPassword
													}
													invalidFeedback={
														formikRegister.errors.confirmPassword
													}
													isValid={formikRegister.isValid}
													onChange={formikRegister.handleChange}
													onBlur={formikRegister.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='accountName'
												isFloating
												label='Tài khoản VPS'>
												<Input
													name='account_name'
													autoComplete='account_name'
													value={formikRegister?.values.account_name}
													isTouched={formikRegister?.touched.account_name}
													invalidFeedback={
														formikRegister?.errors.account_name
													}
													isValid={formikRegister?.isValid}
													onChange={formikRegister?.handleChange}
													onBlur={formikRegister?.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='accountNum'
												isFloating
												label='Loại tài khoản VPS'>
												<Input
													name='account_num'
													autoComplete='account_num'
													value={formikRegister?.values.account_num}
													isTouched={formikRegister?.touched.account_num}
													invalidFeedback={
														formikRegister?.errors.account_num
													}
													isValid={formikRegister?.isValid}
													onChange={formikRegister?.handleChange}
													onBlur={formikRegister?.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='accountPassword'
												isFloating
												label='Mật khẩu tài khoản VPS'>
												<Input
													name='account_password'
													autoComplete='account_password'
													value={formikRegister?.values.account_password}
													isTouched={
														formikRegister?.touched.account_password
													}
													invalidFeedback={
														formikRegister?.errors.account_password
													}
													isValid={formikRegister?.isValid}
													onChange={formikRegister?.handleChange}
													onBlur={formikRegister?.handleBlur}
												/>
											</FormGroup>
										</div>
										<div className='col-12 d-flex gap-2'>
											<Button
												color='warning'
												className='w-100 py-3'
												onClick={formikRegister?.handleSubmit}>
												Đăng ký
											</Button>
											<Button
												color='success'
												className='w-100 py-3'
												onClick={() => setIsRegister(false)}>
												Quay lại đăng nhập
											</Button>
										</div>
									</form>
								)}
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
