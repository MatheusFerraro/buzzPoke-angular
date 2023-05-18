import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string =""

  questions:any
  questionSelected:any

  answers:string[]= []
  answerSelected:string = ""

  questionIndex: number = 0
  questionMaxIndex:number = 0

  finished: boolean = false

  image: string = ""
  nickname:string = ""
  

  constructor() { }

  ngOnInit(): void {
    this.finished = false
    this.title = quizz_questions.title

    this.questions = quizz_questions.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionIndex = 0
    this.questionMaxIndex = this.questions.length

  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }
  async nextStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult (this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      
      if(finalAnswer === "E"){
        this.image = "assets/imgs/Electivire-img.png"
        this.nickname = "elec"
        document.body.classList.toggle('electivire')

      } else if (finalAnswer === "M"){
        this.image = "assets/imgs/Magmortar-img.png"
        this.nickname = "mag"
        document.body.classList.toggle('magmortar')
      } else if(finalAnswer === "R"){
        this.image = "assets/imgs/Rhyperior-img.png"
        this.nickname = "rhyp"
        document.body.classList.toggle('rhyperior')
      } else{
        this.image = "assets/imgs/Tangrowth-img.png" 
        this.nickname = "tang"
        document.body.classList.toggle('tangrowth')
      }  
    
    }

  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item=== previous).length >
        arr.filter(item => item===current).length

      ){
        return previous


      } else {
        return current
      }

    })

    return result

  }


}
