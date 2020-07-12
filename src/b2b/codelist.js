import * as React from "react";
import { List, Datagrid, TextField } from 'react-admin';

export const CLList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="senderCode" />
            <TextField source="receiverCode" />
            <TextField source="description" />
        </Datagrid>
    </List>
);