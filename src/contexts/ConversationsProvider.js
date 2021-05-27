import React, {createContext, useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from "./ContactsProvider";

const ConversationsContext = createContext()

export const useConversations = () => {
	return useContext(ConversationsContext)
}


function arrayEquality(a, b) {
	if (a.length !== b.length) return false;

	a.sort()
	b.sort()

	return a.every((element, index) => {
		return element === b[index];
	})
}

export const ConversationsProvider = ({id, children}) => {
	const [conversations, setConversations] = useLocalStorage('conversations', [])
	const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

	const {contacts} = useContacts()

	const createConversation = recipients => {
		setConversations(prevConversations => {
			return [...prevConversations, {recipients, messages: []}]
		})
	}

	const formattedConversations = conversations.map((conversation, index) => {
		const recipients = conversation.recipients.map(recipient => {
			const contact = contacts.find(contact => {
				return contact.id === recipient
			})
			const name = (contact && contact.name) || recipient
			return {id: recipient, name}
		})

		const messages = conversation.messages.map(message => {
			const contact = contacts.find(contact => {
				return contact.id === message.sender
			})
			const name = (contact && contact.name) || message.sender
			const fromMe = id === message.sender
			return {...message, senderName: name, fromMe}
		})


		const selected = index === selectedConversationIndex

		return {...conversations, recipients, selected, messages}
	})


	const addMessageToConversation = ({recipients, text, sender}) => {
		setConversations(prevConversations => {
			let madeChange = false
			const newMessage = {sender, text}

			const newConversations = prevConversations.map(conversation => {
				if (arrayEquality(conversation.recipients, recipients)) {
					madeChange = true;
					return {
						...conversation,
						messages: [...conversation.messages, newMessage]
					}
				}
				return conversation
			})

			if (madeChange) {
				return newConversations
			} else {
				return [
					...prevConversations,
					{recipients, message: [newMessage]}
				]
			}
		})
	}

	const sendMessage = ({recipients, text}) => {
		addMessageToConversation({recipients, text, sender: id})
	};

	const value = {
		conversations: formattedConversations,
		selectConversationIndex: setSelectedConversationIndex,
		selectedConversation: formattedConversations[selectedConversationIndex],
		createConversation,
		sendMessage,
	}

	return (
		<ConversationsContext.Provider value={value}>
			{children}
		</ConversationsContext.Provider>
	)
}
