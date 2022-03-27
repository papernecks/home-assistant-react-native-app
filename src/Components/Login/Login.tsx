import useHassWebSocket from "hooks/useHassWebsocket";
import { HassConnectionContext } from "lib/context";
import React, { PropsWithChildren, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";

type LoginProps = PropsWithChildren<{}>;

const Login = ({ children, ...props }: LoginProps) => {
  const [hostStr, setHostStr] = useState<string>("");

  const { connection, hostRequired, isError, setHost } = useHassWebSocket({});

  const handleSubmit = () => {
    setHost(hostStr);
  };

  if (!hostRequired && isError) return <Text>There was a weird error</Text>;

  return hostRequired ? (
    <>
      <TextInput
        label={"Enter your Home Assistant URL"}
        value={hostStr}
        onChangeText={setHostStr}
        autoFocus
        placeholder="What host to connect to? e.g. http://localhost:8123"
      />
      <Button onPress={handleSubmit}>Go</Button>
    </>
  ) : (
    <HassConnectionContext.Provider value={connection}>
      {children}
    </HassConnectionContext.Provider>
  );
};

export default Login;
