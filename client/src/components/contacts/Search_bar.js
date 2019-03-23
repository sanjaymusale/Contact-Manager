import React from 'react'
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';


class SearchBar extends React.Component {

    render() {

        return (



            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Search</InputGroupText>
                </InputGroupAddon>
                <Input onChange={this.props.searchFilter} placeholder='Search by Name and Number' />
            </InputGroup>





        )
    }
}

export default SearchBar