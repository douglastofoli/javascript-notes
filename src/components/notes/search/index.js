import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Column } from "rbx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Search (props) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.searchNotes(query)
    }
  }

  return (
    <Column.Group className="is-vcentered" breakpoint="mobile">
      <Column size={9} offset={1}>
        <Input 
          type="text"
          name={query}
          value={query}
          placeholder="Search note..."
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown} 
        />
      </Column>
      <Column mobile={2} size={1}>
        <Link to="/notes" onClick={() => {
          props.fetchNotes()
          setQuery('')
        }}>
          <FontAwesomeIcon
            icon={faTimes}
            color="grey"
            className="is-pulled-left"
          />
        </Link>
      </Column>
    </Column.Group>
  )
}

export default Search;