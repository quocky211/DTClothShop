import {List, Datagrid, TextField} from 'react-admin'

export const listProduct = (props) => (
    <List {...props}>
        <Datagrid>
            {/* <TextField source='_id'/> */}
            <TextField source='name'/>
            <TextField source='price'/>
        </Datagrid>
    </List>
)