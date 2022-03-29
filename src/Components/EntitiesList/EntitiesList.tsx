import {
  callService,
  HassEntities,
  HassEntity,
  subscribeEntities,
} from "home-assistant-js-websocket";
import useHassWebSocket from "hooks/useHassWebsocket";
import { HassConnectionContext } from "lib/context";
import React, { useContext, useEffect, useState } from "react";
import { DataTable, Switch, Text } from "react-native-paper";

type EntitiesListProps = {};

type LightState = "on" | "off" | "unavailable";

const EntitiesListItem = (props: HassEntity) => {
  const { entity_id, state, attributes, context } = props;
  const [type, name] = entity_id.split(".");
  const { friendly_name, device_class, hidden, supported_features } =
    attributes;
  const conn = useContext(HassConnectionContext);

  const toggleState = () => {};
  // callService(conn)
  console.log({ type });
  if (type !== "light") return <></>;
  console.log({ attributes });

  const lightState: LightState = state as LightState;

  return (
    <DataTable.Row>
      <DataTable.Cell>
        <Switch value={lightState === "on" ? true : false} />
        {/* {entity_id} */}
        <Text>{friendly_name}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{`State: ${state}`}</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};

const EntitiesList = ({}: EntitiesListProps) => {
  const [entities, setEntities] = useState<HassEntities>({});

  const connection = useContext(HassConnectionContext);
  useEffect(() => {
    let unsubsribe;
    if (connection) {
      unsubsribe = subscribeEntities(connection, setEntities);
    }
    return unsubsribe;
  }, [connection]);

  const output: JSX.Element[] = Object.keys(entities).reduce((results, key) => {
    const entity = key in entities ? entities[key] : undefined;
    if (!entity) return results;

    return results.concat(<EntitiesListItem key={key} {...entity} />);
  }, [] as JSX.Element[]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Entity Key</DataTable.Title>
        <DataTable.Title>Entity ID</DataTable.Title>
      </DataTable.Header>
      {output}
    </DataTable>
  );
};

export default EntitiesList;
