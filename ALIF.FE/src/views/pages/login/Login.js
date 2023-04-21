import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, setUser } from 'src/redux/slices/login.slice'
import {
  CButton,
  CCard,
  CCardGroup,
  CImage,
  CCol
} from '@coreui/react-pro'
import routes from 'src/routes'
// import gtoprimelogo from '../../../assets/brand/GTO_PRIME_Logo.svg'
import gtoprimelogo from '../../../assets/brand/Logo-Login-Page.png'
// import lefttopelement from '../../../assets/brand/Left-Top-Element.png'
import lefttopelement from '../../../assets/brand/Left-top-artwork.png'
import loginbackground from '../../../assets/brand/Login-Background-Artwork.jpg'
import Logo from '../../../assets/brand/Logo.svg'
import { azureADLogin, fetchUser } from 'src/API/Actions'

const Login = () => {
  const homepage = '/dashboard'
  const navigate2 = useNavigate()
  const nav = () => {
    navigate2(homepage)}

    // const [appState, setAppState] = useContext();
    const [usecase, setUsecase] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [selectedCompany, setSelectedCompany] = useState();
    const [companyOptions, setCompanyOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const { user } = useSelector((state) => state.login);
    
    const dispatch = useDispatch();
    dispatch(login());
    let navigate = useNavigate();
    let token = `${localStorage.getItem("accesstoken")}`;
  
    useEffect(() => {
      if (token !== "null") {
        // getDataOnPageLoad();
        navigate('/dashboard')
      } else {
        navigate('/');
        localStorage.clear();
      }
    }, [isLoggedIn]);
  
    const LoginUser = async (e) => {
      e.preventDefault();
      const response = await azureADLogin();
      if (response.status === 200) {
        setTokensInLocalStorage();
        setIsLoading(false);
        setIsLoggedIn(true);
        navigate(homepage);
        // nav();
        dispatch(login());
      } else {
        setErrorMessage("Invalid Credentials! Please Check Username & Password");
      }
  
      async function getUserDetailsFromAccessToken(token) {
        let response = await fetchUser(token);
        setIsLoading(true);
        if (response.status === 200) {
          setIsLoading(false);
          return response.data;
        }
      }
  
      async function setTokensInLocalStorage() {
        try {
          for (let index = 0; index < sessionStorage.length; index++) {
            if (
              JSON.parse(sessionStorage.getItem(sessionStorage.key(index)))
                .credentialType === "AccessToken"
            ) {
              localStorage.setItem(
                "accesstoken",
                JSON.parse(sessionStorage.getItem(sessionStorage.key(index)))
                  .secret
              );
            } else if (
              JSON.parse(sessionStorage.getItem(sessionStorage.key(index)))
                .credentialType === "RefreshToken"
            ) {
              localStorage.setItem(
                "refreshtoken",
                JSON.parse(sessionStorage.getItem(sessionStorage.key(index)))
                  .secret
              );
            }
          }
          let user = await getUserDetailsFromAccessToken(
            localStorage.getItem("accesstoken")
          );
          localStorage.setItem("uname", user.given_name);
          dispatch(setUser({"uname": user.given_name}));
        } catch (error) {
          throw new Error(error);
        }
      }
    };

  return (
    <CCardGroup style={{height: '100vh'}}>
      <CCol md={4} style={{height: '100%', backgroundColor: 'white'}}>
        <CCard style={{ height: '50%',border:0 ,boxShadow:'none', backgroundColor: 'white'}}>
          <div className="d-grid" style={{ width: '100%', height: '100%' ,border:0, backgroundColor: 'white'}}>
            <CImage src={lefttopelement} alt='logo' orientation='top' width='55%' height='70%' 
            style={{backgroundColor: 'white'}}></CImage>
            <CImage src={gtoprimelogo} alt='logo'  width='35%' height='30%' 
              style={{marginLeft: '10%', marginBottom: '25%', backgroundColor: 'white'}}></CImage>
            <p style={{
              marginLeft: '10%',
              position: 'center', width: '80%', left: '100px', fontFamily: 'Roboto',
              fontStyle: 'normal', fontWeight: '400', fontSize: '11px', lineHeight: '16px', color: '#929292',
              backgroundColor: 'white !important'
            }}>
              This portal doesnt require username and password and uses Active Directory ID for Authentication. Kindly press the below button using your work system.
            </p>
            <CButton style={{width: '20%',height: '100%',textAlign: 'center', color: 'white', backgroundColor: '#5AAD46', borderBlockColor: '#5AAD46', marginLeft: '10%' }}
             shape="rounded-0" onClick={LoginUser} className='border-0'>
              Login
            </CButton>
            <p style={{
              color: 'gray', fontSize: '10px', textAlign: 'left',
              marginLeft:'3%',
              position:'fixed',
              bottom:'0px',
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 300,
              fontSize: '11px',
              lineHeight: '16px',
              backgroundColor: 'white !important'
            }}>
              All Rights Reserved with AlixPartners. &copy; 2022 AlixPartners, LLP</p>
          </div>
        </CCard>
      </CCol>
      <CCol md={8} style={{height: '100%'}}>
        <CCard style={{ height:'100%', color: 'black' }}>
          <CImage orientation='top' src={Logo} alt='logo' width='20%' height='30%'
            style={{ position: 'absolute', left: '77%', bottom: '80%', filter: 'invert(1)' }}></CImage>
          <CImage src={loginbackground} alt='logo' style={{minHeight:'100%',maxHeight:'auto'}}>
          </CImage>
        </CCard>
      </CCol>
    </CCardGroup>
  )
}

export default Login