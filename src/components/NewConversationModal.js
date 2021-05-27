import React, {useState} from 'react'

import {Button, Form, Modal} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'
import {useConversations} from "../contexts/ConversationsProvider";


const NewConversationModal = ({closeModal}) => {
	const [selectedContactIds, setSelectedContactIds] = useState([])
	const {contacts} = useContacts()
	const {createConversation} = useConversations()
	const handleSubmit = e => {
		e.preventDefault()

		createConversation(selectedContactIds)
		closeModal()
	}

	const handleCheckboxChange = contactId => {
		setSelectedContactIds(prevSelectedContactIds => {
			if (prevSelectedContactIds.includes(contactId)) {
				return prevSelectedContactIds.filter(prevId => {
					return contactId !== prevId
				})
			} else {
				return [...prevSelectedContactIds, contactId]
			}
		})
		console.log(selectedContactIds);
	}


	return (
		<>
			<Modal.Header closeButton>
				Create Conversation
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					{contacts.map(contact => (
						<Form.Group className="mb-2" controlId={contact.id} key={contact.id}>
							<Form.Check
								type="checkbox"
								value={selectedContactIds.includes(contact.id)}
								label={contact.name}
								onChange={() => handleCheckboxChange(contact.id)}
							/>
						</Form.Group>
					))}

					<Button type="submit">Create</Button>
				</Form>
			</Modal.Body>
		</>)
}

export default NewConversationModal
