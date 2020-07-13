import * as React from "react";
import { List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm } from 'react-admin';

const textField = (column => {
    return  <TextField key={column.label} source= {column.source} label= {column.label}/>
});

const textInput = (column => {
    return  <TextInput key={column.label} source= {column.source} label= {column.label} style = {{width: 500, height: 50}}/> 
});

const CLFilter = (props) => (
    <Filter {...props}>
        {
            props.filterprops.map(item => textInput(item))
        }
    </Filter>
);

const CLTitle = ({ props }) => {
    return <span>{props.resource}</span>;
        };

export const CLList = props => (
    <List {...props} filters={<CLFilter filterprops = {props.options.codelist.filter}/>} bulkActionButtons={false} title={<CLTitle props= {props}/>}>
        <Datagrid rowClick="edit">
        {
            props.options.codelist.list.map(item => textField(item))
        }
        </Datagrid>
    </List>
);

export const CLEdit = (props) => (

    <Edit title={<CLTitle props= {props}/>} {...props} key={props.resource}>
        <SimpleForm>
            {
                props.options.codelist.edit.map(item => textInput(item))
            }
        </SimpleForm>
    </Edit>
)