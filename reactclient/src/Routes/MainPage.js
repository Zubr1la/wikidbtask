import React from 'react';
import Button from "react-bootstrap/Button";
import CreateArticleModal from "../Components/CreateArticleModal";
import ArticleSearchComponent from "../Components/ArticleSearchComponent";

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createArticleModal:false,
        }
    }
    render() {
        let createArticleModal=() => this.setState({createArticleModal:false});
        return <div className='container'>

           <div className="text-center">
               <Button variant="outline-dark" size='lg' block="true" onClick={()=>this.setState({createArticleModal:true})}>Create article</Button>

               <CreateArticleModal
                   show={this.state.createArticleModal}
                   onHide={createArticleModal}
               />
           </div>

            <hr/>

            <ArticleSearchComponent/>


        </div>
    }
}

export default MainPage;