import * as React from "react";
import { Admin, Resource } from 'react-admin';
import b2bdataprovider from './b2b/dataprovider';
import {CLList} from './b2b/codelist'
import config from './config/config.json';

const codelists = config.codelists

const resource = (codelist => {
    return  <Resource name={codelist.name} list={CLList}/>
})

const App = () => (
      <Admin dataProvider={b2bdataprovider}>
         {
             codelists.map(codelist => resource(codelist))
         }
      </Admin>
  );

export default App;