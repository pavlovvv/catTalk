import MainLayout from "../components/MainLayout.jsx";
import { ThemeProvider } from "@mui/material";
import s from '../styles/settings.module.css'
import styled from "@emotion/styled";
import { TextField, createTheme, Button, Alert, CircularProgress, useMediaQuery } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { updateSecurityData, updatePersonalData, updateAvatar, deleteAvatar } from "../redux/settingsSlice.js";
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import instagramIcon from '../images/Instagram_icon.webp'
import telegramIcon from '../images/Telegram_icon.webp'
import discordIcon from '../images/discord-icon.svg'

const StyledTextField = styled(TextField)({
  "& label": {
    color: "#fff",
  },
  "& label.Mui-focused": {
    color: "#fff",
  },
  "&:hover .MuiInput-underline:hover:before": {
    borderBottomColor: "#fff",
  },
  "&:hover .MuiInput-underline:hover:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
      borderWidth: 2,
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
});


function Settings(props) {

  const authData = useSelector(state => state.sign.userData)

  const isSecurityDataChangingPending = useSelector(state => state.settings.isSecurityDataChangingPending)
  const isSecurityDataChangingConfirmed = useSelector(state => state.settings.isSecurityDataChangingConfirmed)
  const securityDataChangingError = useSelector(state => state.settings.securityDataChangingError)
  const isPersonalDataChangingPending = useSelector(state => state.settings.isPersonalDataChangingPending)
  const isPersonalDataChangingConfirmed = useSelector(state => state.settings.isPersonalDataChangingConfirmed)
  const personalDataChangingError = useSelector(state => state.settings.personalDataChangingError)
  const isAvatarChangingPending = useSelector(state => state.settings.isAvatarChangingPending)
  const isAvatarChangingConfirmed = useSelector(state => state.settings.isAvatarChangingConfirmed)
  const avatarChangingError = useSelector(state => state.settings.avatarChangingError)

  const [value, setValue] = useState("")

  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });


  const theme = createTheme({
    palette: {
      secondary: {
        main: "#fff",
      },
      third: {
        main: "#fff",
      },
      // error: {
      //   main: "#FF4949",
      // },
    },
  });

  const dispatch = useDispatch()

  const mw599px = useMediaQuery("(max-width:599px)");

  const onSecuritySubmit = ({ email, password }) => {
    dispatch(updateSecurityData({
      email,
      password: password || null
    }))
  };

  const onPersonalSubmit = ({ instagramLink, telegramUsername, discordUsername }) => {
    dispatch(updatePersonalData({
      instagramLink: instagramLink || null,
      telegramUsername: telegramUsername || null,
      discordUsername: discordUsername || null,
    }))
  };

  const onImageSubmit = (e) => {

    dispatch(updateAvatar({
      file: e.target.files[0]
    }))

  }


  return (
    <MainLayout>
      <ThemeProvider theme={theme}>
        <div className={s.settingsPage}>
          <div className={s.settingsPanel}>
            <div className={s.container}>
              <div className={s.settingsPanel__inner}>
                <section className={s.settingsPanel__security}>
                  <h2 className={s.settingsPanelTitle}>SECURITY</h2>
                  <form onSubmit={handleSubmit(onSecuritySubmit)} className={s.settingsPanel__securityElements}>
                    <div className={s.settingsPanel__securityElement}>
                      <div>
                        <StyledTextField
                          id="email"
                          label="New email"
                          variant="outlined"
                          required
                          error={!!errors.email}
                          color="third"
                          defaultValue={authData.info[3]?.email}
                          sx={
                            { input: { color: "#fff" }, minWidth: '220px', width: '100%' }
                          }
                          helperText={errors.email && errors.email.message}
                          {...register("email", {
                            required: "Fieled must be filled",
                            minLength: {
                              value: 2,
                              message: "Minimum 2 characters",
                            },
                            maxLength: {
                              value: 25,
                              message: "Maximum 25 characters",
                            },
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+\s*$/i,
                              message: "Invalid email",
                            },
                          })}
                        />
                      </div>
                    </div>
                    <div className={s.settingsPanel__securityElement}>
                      <div>
                        <StyledTextField
                          id="password"
                          label="New password"
                          variant="outlined"
                          error={!!errors.password}
                          color="third"
                          sx={
                            { input: { color: "#fff" }, width: '100%' }
                          }
                          helperText={errors.password && errors.password.message}
                          {...register("password", {

                            minLength: {
                              value: 8,
                              message: "Minimum 8 characters",
                            },
                            maxLength: {
                              value: 25,
                              message: "Maximum 25 characters",
                            }
                          })}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      variant="contained"
                      color='success'
                      size='large'
                      disabled={isSecurityDataChangingPending}
                    >
                      {isSecurityDataChangingPending ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : 'CONFIRM'}
                    </Button>

                    {isSecurityDataChangingConfirmed && <Alert severity="success" color="primary" variant="filled"
                      sx={{ backgroundColor: '#4E9F3D', color: '#fff' }}>
                      Update confirmed
                    </Alert>}
                    {securityDataChangingError && <Alert severity="error" color="primary" variant="filled" sx={{ backgroundColor: "rgb(211, 47, 47)", color: "#fff" }}>
                      {securityDataChangingError}
                    </Alert>}

                  </form>
                </section>

                <section className={s.settingsPanel__personal}>
                  <h2 className={s.settingsPanelTitle}>PERSONAL</h2>
                  <form onSubmit={handleSubmit(onPersonalSubmit)} className={s.settingsPanel__personalElements}>
                    <div className={s.settingsPanel__personalElement}>
                      <span style={{ fontSize: '18px' }}>Avatar: </span>
                      <div>
                        <Button
                          variant="outlined"
                          size='large'
                          color='secondary'
                          component='label'
                          disabled={isAvatarChangingPending}
                        >
                          {isAvatarChangingPending ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : 'UPLOAD FILE'}
                          <input
                            type="file"
                            onChange={onImageSubmit}
                            hidden
                            accept='image/png, image/jpeg'
                          />
                        </Button>
                      </div>
                    </div>
                    {authData.info[7]?.avatar ? <div className={s.settingsPanel__personalElement}>
                      <Image
                        width="50px"
                        height="50px"
                        style={{ borderRadius: '50%' }}
                        src={authData.info[7].avatar}
                        alt="content__img"
                      />
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<NoAccountsIcon />}
                        size='large'
                        onClick={() => {
                          dispatch(deleteAvatar())
                        }}
                        disabled={isAvatarChangingPending}
                      >
                        {isAvatarChangingPending ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : 'DELETE AVATAR'}
                      </Button>
                    </div> : <Alert
                      severity="warning"
                      color="primary"
                      variant="filled"
                      sx={{
                        backgroundColor: "rgb(245, 124, 0)",
                        color: "#fff",
                      }}
                    >
                      It is HIGHLY recommended to use images <br /> with the same width and height <br />(100x100; 404x404; 777x777 etc.) <br /> or at least approximately
                    </Alert>}

                    {isAvatarChangingConfirmed && <Alert severity="success" color="primary" variant="filled"
                      sx={{ backgroundColor: '#4E9F3D', color: '#fff' }}>
                      Update confirmed
                    </Alert>}
                    {avatarChangingError && <Alert severity="error" color="primary" variant="filled" sx={{ backgroundColor: "rgb(211, 47, 47)", color: "#fff" }}>
                      {avatarChangingError}
                    </Alert>}
                    <div className={s.settingsPanel__personalElement}>
                      <div>
                        <Image src={instagramIcon.src}
                          width='50px'
                          height='50px' 
                          alt='instagramIcon'
                          />
                      </div>
                      <div>
                        <StyledTextField
                          id="instagramLink"
                          label="https://www.instagram.com/"
                          variant="outlined"
                          error={!!errors.instagramLink}
                          color="third"
                          defaultValue={authData.info[8]?.instagramLink}
                          sx={
                            !mw599px ? { input: { color: "#fff" }, minWidth: '350px', width: '100%' } :
                              { input: { color: "#fff" }, width: '100%' }
                          }
                          helperText={errors.instagramLink && errors.instagramLink.message}
                          {...register("instagramLink", {
                            minLength: {
                              value: 10,
                              message: "Minimum 10 characters",
                            },
                            pattern: {
                              value: /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com)\/([A-Za-z0-9-_\.]+)/im,
                              message: 'Not instagram link'
                            }
                          })}
                        />
                      </div>
                    </div>

                    <div className={s.settingsPanel__personalElement}>
                      <div>
                        <Image src={telegramIcon.src}
                          width='50px'
                          height='50px' 
                          alt='telegramIcon'
                          />
                      </div>
                      <div>
                        <StyledTextField
                          id="telegramUsername"
                          label="@"
                          variant="outlined"
                          error={!!errors.telegramUsername}
                          color="third"
                          defaultValue={authData.info[9]?.telegramUsername}
                          sx={
                            !mw599px ? { input: { color: "#fff" }, minWidth: '350px', width: '100%' } :
                              { input: { color: "#fff" }, width: '100%' }
                          }
                          helperText={errors.telegramUsername && errors.telegramUsername.message}
                          {...register("telegramUsername", {
                            minLength: {
                              value: 4,
                              message: "Minimum 4 characters",
                            },
                            pattern: {
                              // value: /@+[a-z]+$/,
                              value: /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/,
                              message: 'Not telegram account. Please, start with @'
                            }
                          })}
                        />
                      </div>
                    </div>

                    <div className={s.settingsPanel__personalElement}>
                      <div>
                        <Image src={discordIcon.src}
                          width='50px'
                          height='50px' 
                          alt='discordIcon'
                          />
                      </div>
                      <div>
                        <StyledTextField
                          id="discord username"
                          label="name#0000"
                          variant="outlined"
                          error={!!errors.discordUsername}
                          color="third"
                          defaultValue={authData.info[10]?.discordUsername}
                          sx={
                            !mw599px ? { input: { color: "#fff" }, minWidth: '350px', width: '100%' } :
                              { input: { color: "#fff" }, width: '100%' }
                          }
                          helperText={errors.discordUsername && errors.discordUsername.message}
                          {...register("discordUsername", {
                            minLength: {
                              value: 6,
                              message: "Minimum 6 characters",
                            },
                            pattern: {
                              value: /^((.+?)#\d{4})/,
                              message: 'Not discord account'
                            }
                          })}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      variant="contained"
                      color='success'
                      size='large'
                      disabled={isPersonalDataChangingPending}
                    >
                      {isPersonalDataChangingPending ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : 'CONFIRM'}
                    </Button>

                    {isPersonalDataChangingConfirmed && <Alert severity="success" color="primary" variant="filled"
                      sx={{ backgroundColor: '#4E9F3D', color: '#fff' }}>
                      Update confirmed
                    </Alert>}
                    {personalDataChangingError && <Alert severity="error" color="primary" variant="filled" sx={{ backgroundColor: "rgb(211, 47, 47)", color: "#fff" }}>
                      {personalDataChangingError}
                    </Alert>}
                  </form>

                </section>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </MainLayout>
  )
}


export default function InitialSettings(props) {

  const isAuthed = useSelector((state) => state.sign.isAuthed);
  const isAuthFulfilled = useSelector(state => state.sign.isAuthFulfilled)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthed && isAuthFulfilled) {

      router.push('/signup')

    }
  }, [isAuthFulfilled])


  return (
    <Settings key={isAuthed} {...props} />
  )
}