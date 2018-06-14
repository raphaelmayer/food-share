import React from 'react';
import isOwner from '../helpers/isOwner';

const EditButton = props => {
	return(
		isOwner(props.user) ? <button onClick={ props.onClick }>EditButton</button> : null
	)
}

export default EditButton;

/*
needs 
	function 			in props.onClick, 
	the owner's name 	in props.user
*/