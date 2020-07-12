import * as React from "react";
import { List, Datagrid, TextField, Filter, TextInput } from 'react-admin';

const textField = (column => {
    return  <TextField source= {column.source} label= {column.label}/>
})

const textInput = (column => {
    return  <TextInput source= {column.source} label= {column.label}/>
})

const CLFilter = (props) => (
    <Filter {...props}>
        {
            props.filterprops.map(item => textInput(item))
        }
    </Filter>
);

export const CLList = props => (
    <List {...props} filters={<CLFilter filterprops = {props.options.codelist.filter}/>} bulkActionButtons={false}>
        <Datagrid rowClick="edit">
        {
            props.options.codelist.list.map(item => textField(item))
        }
        </Datagrid>
    </List>
);