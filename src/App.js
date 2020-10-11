import * as React from "react";
import { Admin, Resource } from 'react-admin';
import b2bdataprovider from './b2b/dataProvider';
import b2bauthprovider from './b2b/authProvider';
import {CLList, CLEdit, CLCreate} from './b2b/codelist'
import config from './config/config.json';

const codelists = config.codelists

const resource = (codelist => {
    return  <Resource key={codelist.label} name={codelist.name} list={CLList} edit={CLEdit} create={CLCreate} options={{ label: codelist.label, codelist }}/>
})

const App = () => (
      <Admin dataProvider={b2bdataprovider} authProvider={b2bauthprovider}>
         {
             codelists.map(codelist => resource(codelist))
         }
      </Admin>
  );

export default App;