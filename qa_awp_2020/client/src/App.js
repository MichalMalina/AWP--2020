import React, {Component} from 'react';
import logo from './logo.svg';
import Questions from "./Questions";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import './App.css';
import { Link, Router } from "@reach/router"
import PostAnswer from "./PostAnswer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [


        ]
    }
  }


  componentDidMount() {
      this.getData();
  }


 async getData() {
    const url = "http://localhost:8080/api/questions/";
      const response = await fetch(url);
      const data = await response.json();
      return this.setState({ questions:data} )

  }



  async postData() {
      const url = "http://localhost:8080/api/questions/";
      const response = await fetch(url);
      const data = await response.json();



  }




   async NewQuestion(ques) {
       const request = {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({ques: ques , answ:[{text:"" , vote:2}]})
       };
       const response = await fetch('http://localhost:8080/api/questions/', request);
       const data = await response.json();
       this.getData();
       console.log(data);

   }



    async postAnswer(id, text) {
        console.log("postAnswer", id, text);
        const url = `http://localhost:8080/api/questions/${id}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: text, vote : 2})
        });
        const data = await response.json();
        this.getData();
        console.log("Printing the response:", data);
    }



    getQuestion(id) {
        //  const findFunction = question => question.id === parseInt(id);
        // return this.state.questions.find(findFunction);
        return this.state.questions.find(k => k._id === id);
    }

render() {
      


  return (
      <>




          <Router>

              <NewQuestion path="/new" NewQuestion={(ques) => this.NewQuestion(ques)} data={this.state.questions}  />
              <Questions path="/" data={this.state.questions} changeDone={index => this.changeDone(index)}></Questions>
              <Question path="/question/:id" data={this.state.questions} postAnswer={(id, text) => this.postAnswer(id, text)} getQuestion={id =>this.getQuestion(id)}></Question>


          </Router>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <p>(Trivia) Amount of Questions so far {this.state.questions.length}.</p>

      </>
  );
}


}

export default App;
