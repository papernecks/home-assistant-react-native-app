import { HassEntities, subscribeEntities } from "home-assistant-js-websocket";
import { HassConnectionContext } from "lib/context";
import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "react-native-paper";

type EntitiesListProps = {};

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

    return results.concat(
      <DataTable.Row key={key}>
        <DataTable.Cell>{key}</DataTable.Cell>
        <DataTable.Cell>{entity.entity_id}</DataTable.Cell>
      </DataTable.Row>
    );
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
