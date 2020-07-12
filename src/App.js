import * as React from "react";
import { Admin, Resource } from 'react-admin';
import b2bdataprovider from './b2b/dataprovider';
import b2bauthprovider from './b2b/authProvider';
import {CLList} from './b2b/codelist'
import config from './config/config.json';

const codelists = config.codelists

const resource = (codelist => {
    return  <Resource name={codelist.name} list={CLList} options={{ label: codelist.label, codelist }}/>
})

const App = () => (
      <Admin dataProvider={b2bdataprovider} authProvider={b2bauthprovider}>
         {
             codelists.map(codelist => resource(codelist))
         }
      </Admin>
  );

export default App;