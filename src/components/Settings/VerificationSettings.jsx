import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Tooltip,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { apiUrl } from "../../config/environmentVar";

const VerificationSettings = () => {
  const { user } = ChatState();
  const [dirRow] = useMediaQuery("(min-width: 600px)");

  const [isDisabledSendNewVerifEmail, setIsDisabledSendNewVerifEmail] =
    useState(false);
  const [isLoadingSendNewVerifEmail, setIsLoadingSendNewVerifEmail] =
    useState(false);
  const [isDisabledResendVerifEmail, setIsDisabledResendVerifEmail] =
    useState(false);
  const [isLoadingResendVerifEmail, setIsLoadingResendVerifEmail] =
    useState(false);
  const [isDisabledSendNewVerifSMS, setIsDisabledSendNewVerifSMS] =
    useState(false);
  const [isLoadingSendNewVerifSMS, setIsLoadingSendNewVerifSMS] =
    useState(false);
  const [isDisabledResendVerifSMS, setIsDisabledResendVerifSMS] =
    useState(false);
  const [isLoadingResendVerifSMS, setIsLoadingResendVerifSMS] = useState(false);

  const toast = useToast();

  const sendNewVerifEmail = async () => {
    setIsLoadingSendNewVerifEmail(true);
    setIsDisabledSendNewVerifEmail(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/verify/email/send`,
        {
          email: user.email,
        },
        config
      );
      toast({
        title: "Verification Email Sent",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      // console.error("Error sending verification email:", error); // Log the full error

      // let errorMessage = "Unable to send verification email";

      // if (error.response) {
      //   if (error.response.data && error.response.data.message) {
      //     errorMessage = error.response.data.message;
      //   } else if (error.response.status === 404) {
      //     errorMessage = "API endpoint not found";
      //   } else if (error.response.status === 500) {
      //     errorMessage = "Internal server error";
      //   }
      // }
      toast({
        title: "Error Occurred",
        description:
          error.response?.data?.message || "Unable to send verification email",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoadingSendNewVerifEmail(false);
      setIsDisabledSendNewVerifEmail(false);
    }
  };
  const resendVerifEmail = async () => {
    setIsLoadingResendVerifEmail(true);
    setIsDisabledResendVerifEmail(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/verify/email/resend`,
        {
          email: user.email,
        },
        config
      );
      toast({
        title: "Verification Email Resent",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occurred",
        description:
          error.response?.data?.message ||
          "Unable to resend verification email",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoadingResendVerifEmail(false);
      setIsDisabledResendVerifEmail(false);
    }
  };
  const sendNewVerifSMS = async () => {
    setIsLoadingSendNewVerifSMS(true);
    setIsDisabledSendNewVerifSMS(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/verify/phoneno/send`,
        {
          phoneNumber: user.phoneNumber,
        },
        config
      );
      toast({
        title: "Verification SMS Sent",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occurred",
        description:
          error.response?.data?.message || "Unable to send verification SMS",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoadingSendNewVerifSMS(false);
      setIsDisabledSendNewVerifSMS(false);
    }
  };
  const resendVerifSMS = async () => {
    setIsLoadingResendVerifSMS(true);
    setIsDisabledResendVerifSMS(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/user/verify/phoneno/resend`,
        {
          phoneNumber: user.phoneNumber,
        },
        config
      );
      toast({
        title: "Verification SMS Resent",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occurred",
        description:
          error.response?.data?.message || "Unable to resend verification SMS",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoadingResendVerifSMS(false);
      setIsDisabledResendVerifSMS(false);
    }
  };

  return (
    <form style={{ width: "100%" }}>
      <VStack maxWidth={"60em"} gap="1vh">
        {user.user.isVerifiedEmail ? (
          <Tooltip
            label="Email is already verified"
            placement="bottom"
            hasArrow
          >
            <FormControl
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              flexDir={"column"}
            >
              <FormLabel>Email</FormLabel>
              <Box
                w="100%"
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                flexDir={"column"}
                gap="2vh"
              >
                <InputGroup borderColor="#CBD5E0" cursor="not-allowed">
                  <InputLeftAddon pointerEvents="none" children="Current" />
                  <Input
                    className="noOutline noBorderVerify"
                    type="text"
                    color="rgb(66, 153, 225)"
                    value={user.user.email}
                    isDisabled={true}
                  />
                </InputGroup>
              </Box>
              <Button
                colorScheme="blue"
                variant="outline"
                width="100%"
                bg="#ebf8ff"
                mt="2vh"
                className="noOutline"
                isDisabled={true}
              >
                Get Verification link
              </Button>
            </FormControl>
          </Tooltip>
        ) : (
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexDir={"column"}
          >
            <FormLabel>Email</FormLabel>
            <Box
              w="100%"
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              flexDir={"column"}
              gap="2vh"
            >
              <InputGroup borderColor="#CBD5E0" cursor="not-allowed">
                <InputLeftAddon pointerEvents="none" children="Current" />
                <Input
                  className="noOutline noBorderVerify"
                  type="text"
                  color="rgb(66, 153, 225)"
                  value={user.user.email}
                  isDisabled={true}
                />
              </InputGroup>
            </Box>
            <ButtonGroup
              w="100%"
              flexDir={dirRow ? "row" : "column"}
              gap="1em"
              css={{
                "&>*:not(style)~*:not(style)": {
                  "-webkit-margin-start": "0",
                  "margin-inline-start": "0",
                },
              }}
            >
              <Button
                colorScheme="blue"
                variant="outline"
                width="100%"
                bg="#ebf8ff"
                mt="2vh"
                className="noOutline"
                onClick={sendNewVerifEmail}
                loadingText="Sending..."
                isDisabled={isDisabledSendNewVerifEmail}
                isLoading={isLoadingSendNewVerifEmail}
              >
                Send New Verification Email
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                width="100%"
                bg="#FFF5F5"
                mt={dirRow ? "2vh" : "0"}
                className="noOutline"
                onClick={resendVerifEmail}
                loadingText="Sending..."
                isDisabled={isDisabledResendVerifEmail}
                isLoading={isLoadingResendVerifEmail}
              >
                Resend Verification Email
              </Button>
            </ButtonGroup>
          </FormControl>
        )}
        {user.user.isVerifiedPhoneNumber ? (
          <Tooltip
            label="Phone Number is already verified"
            placement="bottom"
            hasArrow
          >
            <FormControl
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              flexDir={"column"}
            >
              <FormLabel>Phone Number</FormLabel>
              <Box
                w="100%"
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                flexDir={"column"}
                gap="2vh"
              >
                <InputGroup borderColor="#CBD5E0" cursor="not-allowed">
                  <InputLeftAddon pointerEvents="none" children="Current" />
                  <Input
                    className="noOutline noBorderVerify"
                    type="text"
                    color="rgb(66, 153, 225)"
                    value={user.user.phoneNumber}
                    isDisabled={true}
                  />
                </InputGroup>
              </Box>
              <Button
                colorScheme="blue"
                variant="outline"
                width="100%"
                bg="#ebf8ff"
                mt="2vh"
                className="noOutline"
                isDisabled={true}
              >
                Get Verification link
              </Button>
            </FormControl>
          </Tooltip>
        ) : (
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexDir={"column"}
          >
            <FormLabel>Phone Number</FormLabel>
            <Box
              w="100%"
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              flexDir={"column"}
              gap="2vh"
            >
              <InputGroup borderColor="#CBD5E0" cursor="not-allowed">
                <InputLeftAddon pointerEvents="none" children="Current" />
                <Input
                  className="noOutline noBorderVerify"
                  type="text"
                  color="rgb(66, 153, 225)"
                  value={user.user.phoneNumber}
                  isDisabled={true}
                />
              </InputGroup>
            </Box>
            <ButtonGroup
              w="100%"
              flexDir={dirRow ? "row" : "column"}
              gap="1em"
              css={{
                "&>*:not(style)~*:not(style)": {
                  "-webkit-margin-start": "0",
                  "margin-inline-start": "0",
                },
              }}
            >
              <Button
                colorScheme="blue"
                variant="outline"
                width="100%"
                mt="2vh"
                bg="#ebf8ff"
                className="noOutline"
                onClick={sendNewVerifSMS}
                loadingText="Sending..."
                isDisabled={isDisabledSendNewVerifSMS}
                isLoading={isLoadingSendNewVerifSMS}
              >
                Send New Verification SMS
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                width="100%"
                bg="#FFF5F5"
                className="noOutline"
                mt={dirRow ? "2vh" : "0"}
                onClick={resendVerifSMS}
                loadingText="Sending..."
                isDisabled={isDisabledResendVerifSMS}
                isLoading={isLoadingResendVerifSMS}
              >
                Resend Verification SMS
              </Button>
            </ButtonGroup>
          </FormControl>
        )}
      </VStack>
    </form>
  );
};

export default VerificationSettings;
