import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import b2bdataprovider from './b2b/dataprovider';

const App = () => (
      <Admin dataProvider={b2bdataprovider}>
          <Resource name="EVC_KR_TEST" list={ListGuesser} label= "EVC_RECEIPT_FILESYSTEM" />
      </Admin>
  );

export default App;