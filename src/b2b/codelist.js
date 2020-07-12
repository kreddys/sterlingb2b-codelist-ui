import * as React from "react";
import { List, Datagrid, TextField, Filter, TextInput } from 'react-admin';

const CLFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Sender Code" source="senderCode" />
        <TextInput label="Receiver Code" source="receiverCode" />
        <TextInput label="Description" source="description" />
    </Filter>
);

export const CLList = props => (
    <List {...props} filters={<CLFilter />} bulkActionButtons={false}>
        <Datagrid rowClick="edit">
            <TextField source="senderCode" />
            <TextField source="receiverCode" />
            <TextField source="description" />
        </Datagrid>
    </List>
);