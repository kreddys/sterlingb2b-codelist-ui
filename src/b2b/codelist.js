import * as React from "react";
import { required, Create, List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm, TopToolbar, CloneButton } from 'react-admin';

const textField = (column => {
    return  <TextField key={column.source} source= {column.source} label= {column.label}/>
});

const textInput = (column => {
    return  <TextInput key={column.label} 
    source= {column.source} 
    label= {column.label}
    validate= {column.required ? required() : undefined}
    style = {{width: 500, height: 50}}/> 
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
    <List {...props} filters={<CLFilter filterprops = {props.options.codelist.list_and_filter}/>} title={<CLTitle props= {props}/>}>
        <Datagrid rowClick="edit" key={props.resource}>
        {
            props.options.codelist.list_and_filter.map(item => textField(item))
        }
        </Datagrid>
    </List>
);

const EditActions = ({ basePath, data }) => (
    <TopToolbar>
        <CloneButton
            className="button-clone"
            basePath={basePath}
            record={data}
        />
    </TopToolbar>
);

export const CLEdit = (props) => (

    <Edit title={<CLTitle props= {props}/>} {...props} key={props.resource} actions={<EditActions />}>
        <SimpleForm>
            {
                props.options.codelist.create_and_edit.map(item => textInput(item))
            }
        </SimpleForm>
    </Edit>
)

export const CLCreate = (props) => (

    <Create title={<CLTitle props= {props}/>} {...props} key={props.resource}>
        <SimpleForm>
            {
                props.options.codelist.create_and_edit.map(item => textInput(item))
            }
        </SimpleForm>
    </Create>
)