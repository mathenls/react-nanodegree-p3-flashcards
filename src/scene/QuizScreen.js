import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MyButton from '../component/MyButton'
import generateId from 'uuid/v4'
import Swiper from 'react-native-swiper'
import { QuestionSlide } from '../component/QuestionSlide'
import { NotificationStore } from '../store/NotificationStore'
import { Theme } from '../theme'

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
  notificationStore = new NotificationStore()
  componentDidMount() {
    let questions = this.props.navigation.getParam('questions', 'no questions')
    questions = questions.map((q) => ({...q, showingAnswer: false, id: generateId()}))
    this.setState({
      questions
    })
  }

  toggleShowAnswer = (question) => {
    this.setState({
      questions: this.state.questions.map((q) => {
          if (q.id === question.id) {
              q.showingAnswer = !q.showingAnswer
          }
          return q
        })
      })
  }

  correctAnswer = () => {
    this.setState({
      correctQuestions: this.state.correctQuestions + 1
    }, () => {
      this._swiper.scrollBy(1)
    })
  }

  swipeSlider = () => {
    this._swiper.scrollBy(1)
  }

  restartQuiz = () => {
    const { questions } = this.state
    if (this._swiper && this._swiper.scrollView) {
        this.setState({
          correctQuestions: 0,
          questions: this.state.questions.map((q) => ({...q, showingAnswer: false}))
        }, () => {
          this._swiper.scrollBy(-(questions.length))
        })
    }
  }

  finalizeQuiz = (percentage) => {
    this.notificationStore.cancelNotifications()
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
    const percentage = ((correctQuestions / questions.length) * 100).toFixed(2)
    const finalPage = (
      <View key='results' style={styles.slide1}>
        <Text style={styles.text}>
          {`You got ${percentage}% of the questions correct`}
        </Text>
        <Text style={styles.text}>
          {this.finalizeQuiz(percentage)}
        </Text>
        <MyButton
            text='Restart Quiz'
            onPress={this.restartQuiz}
        />
        <MyButton
            text='Back to Deck'
            onPress={() => this.props.navigation.pop()}
        />
      </View>
    )

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
              <QuestionSlide
                key={question.id}
                question={question}
                cardCount={questions.length}
                toggleShowAnswer={this.toggleShowAnswer}
                swipeSlider={this.swipeSlider}
                onCorrectAnswer={this.correctAnswer}
                index={index}
              />
            )
          }).concat(finalPage)}
        </Swiper>
    )
  }
}

AppRegistry.registerComponent('p3-flashcards', () => Swiper)
QuizScreen.navigationOptions = {
  title: 'Quiz',
  headerTitleStyle: {
      color: 'white'
  },
  headerStyle: {
      backgroundColor: Theme.primaryColor,
  },
}