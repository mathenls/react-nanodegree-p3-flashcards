import styled from 'styled-components/native'
import React from 'react'

const _MyTextInput = styled.TextInput`
    border-radius: 2px;
    border-style: solid;
    border-width: 1px;
    border-color: black;
    padding: 4px 8px;
`

export const MyTextInput = (props) => <_MyTextInput underlineColorAndroid='transparent' {...props}/>