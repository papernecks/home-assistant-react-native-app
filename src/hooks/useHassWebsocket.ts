import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Auth,
  AuthData,
  Connection,
  createConnection,
  ERR_HASS_HOST_REQUIRED,
  getAuth,
  getAuthOptions,
  HassEntities,
  LoadTokensFunc,
  SaveTokensFunc,
} from "home-assistant-js-websocket";
import { useCallback, useEffect, useState } from "react";

type UseHassWebSocketProps = getAuthOptions;

const storeAuth: SaveTokensFunc = async (value: AuthData | null) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@hassAuth", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getStoredAuth: LoadTokensFunc = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@hassAuth");
    return jsonValue != null
      ? (JSON.parse(jsonValue) as AuthData | undefined)
      : null;
  } catch (e) {
    // error reading value
  }
};

const useHassWebSocket = (props?: UseHassWebSocketProps) => {
  const [host, setHost] = useState<string | undefined>();
  const [auth, setAuth] = useState<Auth>();
  const [connection, setConnection] = useState<Connection>();
  const [hostRequired, setHostRequired] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>();

  const tryAuth = useCallback(
    async (hassUrl?: string) => {
      let authResult;
      setIsLoading(true);
      try {
        const authOptions: getAuthOptions = {
          loadTokens: getStoredAuth,
          saveTokens: storeAuth,
          hassUrl,
          ...props,
        };

        authResult = await getAuth(authOptions);
      } catch (err) {
        if (err === ERR_HASS_HOST_REQUIRED) {
          setHostRequired(true);
        }
        setIsError(true);
      }

      setIsLoading(false);
      setAuth(authResult);
      return authResult;
    },
    [props]
  );

  useEffect(() => {
    tryAuth(host);
  }, [host]);

  useEffect(() => {
    if (!auth) return;

    const connect = async () => {
      const connection = await createConnection({ auth });
      setConnection(connection);
    };

    connect();
  }, [auth]);

  return {
    connection,
    hostRequired,
    isError,
    isLoading,
    setHost,
  };
};

export default useHassWebSocket;
