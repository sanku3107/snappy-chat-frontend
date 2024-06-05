import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  PinInput,
  PinInputField,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import OrDivider from "../miscellaneous/OrDivider";
import { apiUrl, passwordRegex } from "../../config/environmentVar";

const PasswordSettings = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [loadingViaEmailSendNewOtp, setLoadingViaEmailSendNewOtp] =
    useState(false);
  const [loadingViaEmailResendOtp, setLoadingViaEmailResendOtp] =
    useState(false);
  const [loadingViaPhoneNumberSendNewOtp, setLoadingViaPhoneNumberSendNewOtp] =
    useState(false);
  const [loadingViaPhoneNumberResendOtp, setLoadingViaPhoneNumberResendOtp] =
    useState(false);

  const [disabledViaEmailSendNewOtp, setDisabledViaEmailSendNewOtp] =
    useState(false);
  const [disabledViaEmailResendOtp, setDisabledViaEmailResendOtp] =
    useState(false);
  const [
    disabledViaPhoneNumberSendNewOtp,
    setDisabledViaPhoneNumberSendNewOtp,
  ] = useState(false);
  const [disabledViaPhoneNumberResendOtp, setDisabledViaPhoneNumberResendOtp] =
    useState(false);

  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const [disabledChangePassword, setDisabledChangePassword] = useState(false);

  const [FormOtpDir] = useMediaQuery("(min-width: 1050px)");
  const [width, setWidth] = useState();
  const elementRef = useRef(null);

  const toast = useToast();
  const viaEmailSendNewOtp = async () => {
    setLoadingViaEmailSendNewOtp(true);
    setDisabledViaEmailResendOtp(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { email } = userInfo.user;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/password/reset/email/send`,
        { email },
        config
      );

      toast({
        title: "OTP Sent Successfully",
        description: `Otp will be expired on ${data.expireAt.date} at ${data.expireAt.time}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingViaEmailSendNewOtp(false);
      setDisabledViaEmailResendOtp(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.msg?.text || "Try again later!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingViaEmailSendNewOtp(false);
      setDisabledViaEmailResendOtp(false);
    }
  };
  const viaEmailResendOtp = async () => {
    setLoadingViaEmailResendOtp(true);
    setDisabledViaEmailSendNewOtp(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { email } = userInfo.user;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/password/reset/email/resend`,
        { email },
        config
      );

      toast({
        title: "OTP Sent Successfully",
        description: `Otp will be expired on ${data.expireAt.date} at ${data.expireAt.time}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingViaEmailResendOtp(false);
      setDisabledViaEmailSendNewOtp(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.msg?.text || "Try again later!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingViaEmailResendOtp(false);
      setDisabledViaEmailSendNewOtp(false);
    }
  };
  const viaPhoneNumberSendNewOtp = async () => {
    setLoadingViaPhoneNumberSendNewOtp(true);
    setDisabledViaPhoneNumberResendOtp(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { phoneNumber } = userInfo.user;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/password/reset/phoneno/send`,
        { phoneNumber },
        config
      );

      toast({
        title: "OTP Sent Successfully",
        description: `Otp will be expired on ${data.expireAt.date} at ${data.expireAt.time}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingViaPhoneNumberSendNewOtp(false);
      setDisabledViaPhoneNumberResendOtp(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.msg?.text || "Try again later!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingViaPhoneNumberSendNewOtp(false);
      setDisabledViaPhoneNumberResendOtp(false);
    }
  };
  const viaPhoneNumberResendOtp = async () => {
    setLoadingViaPhoneNumberResendOtp(true);
    setDisabledViaPhoneNumberSendNewOtp(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { phoneNumber } = userInfo.user;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // console.log("Sending OTP request for phone number:", phoneNumber);
      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/password/reset/phoneno/resend`,
        { phoneNumber },
        config
      );

      // console.log("Received response:", data);
      toast({
        title: "OTP Sent Successfully",
        description: `Otp will be expired on ${data.expireAt.date} at ${data.expireAt.time}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingViaPhoneNumberResendOtp(false);
      setDisabledViaPhoneNumberSendNewOtp(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.msg?.text || "Try again later!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingViaPhoneNumberResendOtp(false);
      setDisabledViaPhoneNumberSendNewOtp(false);
    }
  };

  const changePassword = async () => {
    setLoadingChangePassword(true);
    setDisabledChangePassword(true);
    setDisabledViaPhoneNumberResendOtp(true);
    setDisabledViaPhoneNumberSendNewOtp(true);
    setDisabledViaEmailSendNewOtp(true);
    setDisabledViaEmailResendOtp(true);

    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingChangePassword(false);
      setDisabledChangePassword(false);
      setDisabledViaPhoneNumberResendOtp(false);
      setDisabledViaPhoneNumberSendNewOtp(false);
      setDisabledViaEmailSendNewOtp(false);
      setDisabledViaEmailResendOtp(false);
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 20) {
      toast({
        title: "Please Enter a valid Password",
        description: "Password must be 6 to 20 characters long.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingChangePassword(false);
      setDisabledChangePassword(false);
      setDisabledViaPhoneNumberResendOtp(false);
      setDisabledViaPhoneNumberSendNewOtp(false);
      setDisabledViaEmailSendNewOtp(false);
      setDisabledViaEmailResendOtp(false);
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      toast({
        title: "Please Enter a valid Password",
        description:
          "Password mustn't have white spaces. Eg. vdhavsds132, 17367vu24GF45&6",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoadingChangePassword(false);
      setDisabledChangePassword(false);
      setDisabledViaPhoneNumberResendOtp(false);
      setDisabledViaPhoneNumberSendNewOtp(false);
      setDisabledViaEmailSendNewOtp(false);
      setDisabledViaEmailResendOtp(false);
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { email, phoneNumber } = userInfo.user;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      let requestBody = {
        email,
        phoneNumber,
        newPassword,
      };

      if (password) {
        // Use current password for password change
        requestBody.password = password;
      } else if (token && token.length === 6 && /^\d{6}$/.test(token)) {
        // Use OTP for password change
        requestBody.token = token;
      } else {
        toast({
          title: "Invalid Input",
          description:
            "Please provide either the current password or a valid OTP.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoadingChangePassword(false);
        setDisabledChangePassword(false);
        setDisabledViaPhoneNumberResendOtp(false);
        setDisabledViaPhoneNumberSendNewOtp(false);
        setDisabledViaEmailSendNewOtp(false);
        setDisabledViaEmailResendOtp(false);
        return;
      }

      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/password/reset/verify/afterLogin`,
        requestBody,
        config
      );

      setLoadingChangePassword(false);
      setDisabledChangePassword(false);
      setDisabledViaPhoneNumberResendOtp(false);
      setDisabledViaPhoneNumberSendNewOtp(false);
      setDisabledViaEmailSendNewOtp(false);
      setDisabledViaEmailResendOtp(false);
      toast({
        title: "Success",
        description: "Password Changed Successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      setLoadingChangePassword(false);
      setDisabledChangePassword(false);
      setDisabledViaPhoneNumberResendOtp(false);
      setDisabledViaPhoneNumberSendNewOtp(false);
      setDisabledViaEmailSendNewOtp(false);
      setDisabledViaEmailResendOtp(false);
      toast({
        title: "Error Occurred!",
        description:
          error.response?.data?.msg ||
          "Something Provided Wrong or User is not verified!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    setWidth(elementRef.current.getBoundingClientRect().width);
  }, [window.innerWidth]);

  return (
    <form style={{ width: "100%" }}>
      <VStack maxWidth={"60em"} gap="1vh">
        <FormControl
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDir="column"
        >
          <FormLabel>Change Password</FormLabel>
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexDir="column"
            gap="2vh"
          >
            <InputGroup borderColor="#CBD5E0" cursor="not-allowed">
              <InputLeftAddon
                display="flex"
                justifyContent="center"
                width={width}
                pointerEvents="none"
                children="Current"
              />
              <Input
                className="noOutline noBorderChange"
                placeholder="Enter Current Password"
                type={show ? "text" : "password"}
                _placeholder={{ color: "rgba(66, 153, 225,0.6)" }}
                color="rgba(66, 153, 225,0.6)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow((show) => !show)}
                  className="noOutline"
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </FormControl>
        <OrDivider />
        <VStack gap="1vh" w="100%" alignItems={"flex-start"}>
          <FormLabel marginBottom="-0.5vh">Forgot Password</FormLabel>

          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir={FormOtpDir ? "row" : "column"}
            flexWrap="wrap"
          >
            <FormLabel
              flex="2"
              paddingLeft="1vw"
              alignSelf="flex-start"
              color="#4A5568"
            >
              Enter OTP :
            </FormLabel>
            <HStack
              paddingLeft="1vw"
              flex="6"
              display="flex"
              w="100%"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <PinInput
                type="number"
                value={token}
                onChange={(e) => setToken(e)}
              >
                <PinInputField className="noOutline" borderColor="gray.300" />
                <PinInputField className="noOutline" borderColor="gray.300" />
                <PinInputField className="noOutline" borderColor="gray.300" />
                <PinInputField className="noOutline" borderColor="gray.300" />
                <PinInputField className="noOutline" borderColor="gray.300" />
                <PinInputField className="noOutline" borderColor="gray.300" />
              </PinInput>
            </HStack>
          </FormControl>
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir={FormOtpDir ? "row" : "column"}
            flexWrap="wrap"
          >
            <FormLabel
              flex="2"
              paddingLeft="1vw"
              alignSelf="flex-start"
              color="#4A5568"
            >
              Via Phone Number :
            </FormLabel>
            <ButtonGroup flex="6" w="100%" gap="1vw" paddingLeft="1vw">
              <Button
                colorScheme="blue"
                variant="ghost"
                w="100%"
                bg="#ebf8ff"
                className="noOutline"
                loadingText="Sending..."
                isDisabled={disabledViaPhoneNumberSendNewOtp}
                isLoading={loadingViaPhoneNumberSendNewOtp}
                onClick={viaPhoneNumberSendNewOtp}
              >
                Send New OTP
              </Button>
              <Button
                colorScheme="red"
                variant="ghost"
                w="100%"
                bg="#FFF5F5"
                className="noOutline"
                loadingText="Sending..."
                isDisabled={disabledViaPhoneNumberResendOtp}
                isLoading={loadingViaPhoneNumberResendOtp}
                onClick={viaPhoneNumberResendOtp}
              >
                Resend OTP
              </Button>
            </ButtonGroup>
          </FormControl>
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir={FormOtpDir ? "row" : "column"}
            flexWrap="wrap"
          >
            <FormLabel
              flex="2"
              paddingLeft="1vw"
              alignSelf="flex-start"
              color="#4A5568"
            >
              Via Email :
            </FormLabel>
            <ButtonGroup flex="6" w="100%" gap="1vw" paddingLeft="1vw">
              <Button
                colorScheme="blue"
                variant="ghost"
                w="100%"
                bg="#ebf8ff"
                className="noOutline"
                loadingText="Sending..."
                isDisabled={disabledViaEmailSendNewOtp}
                isLoading={loadingViaEmailSendNewOtp}
                onClick={viaEmailSendNewOtp}
              >
                Send New OTP
              </Button>
              <Button
                colorScheme="red"
                variant="ghost"
                w="100%"
                bg="#FFF5F5"
                className="noOutline"
                loadingText="Sending..."
                isDisabled={disabledViaEmailResendOtp}
                isLoading={loadingViaEmailResendOtp}
                onClick={viaEmailResendOtp}
              >
                Resend OTP
              </Button>
            </ButtonGroup>
          </FormControl>
        </VStack>
        <Divider opacity="1" />
        <FormControl
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDir={"column"}
        >
          <FormLabel>New Password</FormLabel>
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexDir={"column"}
            gap="2vh"
          >
            <InputGroup borderColor="#CBD5E0" cursor="not-allowed">
              <InputLeftAddon
                display="flex"
                justifyContent="center"
                width={width}
                pointerEvents="none"
                children="New"
              />
              <Input
                className="noOutline noBorderChange"
                placeholder="Enter New Password"
                type={show1 ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow1((show1) => !show1)}
                  className="noOutline"
                >
                  {show1 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup borderColor="#CBD5E0">
              <InputLeftAddon
                pointerEvents="none"
                ref={elementRef}
                display="flex"
                justifyContent="center"
                children={"Confirm"}
              />
              <Input
                className="noOutline noBorderChange"
                placeholder="Confirm New Password"
                type={show2 ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />

              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow2((show2) => !show2)}
                  className="noOutline"
                >
                  {show2 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Button
            colorScheme="blue"
            variant="outline"
            width="100%"
            bg="#ebf8ff"
            mt="2vh"
            className="noOutline"
            onClick={changePassword}
            loadingText="Changing..."
            isDisabled={disabledChangePassword}
            isLoading={loadingChangePassword}
          >
            Change Password
          </Button>
        </FormControl>
      </VStack>
    </form>
  );
};
export default PasswordSettings;
