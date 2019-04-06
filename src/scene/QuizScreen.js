import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MyButton } from '../component/MyButton'
import generateId from 'uuid/v4'
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native'
import { QuestionSlide } from '../component/QuestionSlide'

const Container = styled.View`
    flex: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    justify-content: center;
    align-items: center;
    padding: 48px;
`

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BB86FC',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BB86FC',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BB86FC',
  },
  text: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'normal',
  },
  indexes: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'normal',
  }
})

export default class QuizScreen extends Component {
  state = {
    questions: [],
    correctQuestions: 0
  }
  _swiper = {}

  componentDidMount() {
    let questions = this.props.navigation.getParam('questions', 'no questions')
    questions = questions.map((q) => ({...q, showingAnswer: false, id: generateId()}))
      
    this.setState({
      questions
    })
  }

  correctAnswer = () => {
    this.setState({
      correctQuestions: this.state.correctQuestions + 1
    }, () => {
      this._swiper.scrollBy(1)
    })
  }

  returnFinalMessage = (percentage) => {
    if (percentage === 100) {
      return `Perfect! You are rocking this deck's subject!`
    } else if (percentage >= 75) {
      return `Awesome! You just an inch from perfection!`
    } else if (percentage >= 50 && percentage <= 74) {
      return `Nice! You are getting there!`
    } else {
      return `Oh... Study a little more and you will rock it.`
    }
  }

  render() {
    const { questions, correctQuestions } = this.state
    const percentage = (correctQuestions / questions.length) * 100

    return (
        <Swiper 
          ref={(swiper) => {this._swiper = swiper}} 
          showsPagination={false} 
          showsButtons={false} 
          style={styles.wrapper}
          loop={false}
        >
          {questions.map((question, index) => {
            return (
              <QuestionSlide question={question} index={index} />
            )
          }).concat(
            <View key='results' style={styles.slide1}>
              <Text style={styles.text}>
                {`You got ${percentage}% of the questions correct!`}
              </Text>
              <Text style={styles.text}>
                {this.returnFinalMessage(percentage)}
              </Text>
            </View>
          )}
        </Swiper>
    )
  }
}

AppRegistry.registerComponent('p3-flashcards', () => Swiper)