import styled from 'styled-components/native'
import { Theme } from '../theme';
import React from 'react'

export const _MyButton = styled.Button`
    padding: 4px 8px;
    margin: 16px;
    min-width: 40px;
    color: white;
    border-radius: 20px;
`

export const MyButton = (props) => <_MyButton color={Theme.primaryColor} {...props} />