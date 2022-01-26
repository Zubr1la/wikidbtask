import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import axios from "axios";

class CreateArticleModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articleType:0,
            title:'',
            description:'',
            message:'',
            date:'',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    onChangeTitle(e){
        this.setState({title:e.target.value});
    }

    onChangeText(e){
        this.setState({description:e.target.value});
    }

    onChangeDate(e){
        this.setState({date:e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({message:""});

        if(this.state.title.length<5) {
            this.setState({message:"Title should be at least 5 symbols long"});
            return;
        }else if(this.state.title.length>50){
            this.setState({message:"Title should not be longer than 50 symbols!"});
            return;
        }

        if(this.state.description==="") {
            this.setState({message:"Description cannot be empty!"});
            return
        }else if(this.state.description.length>500){
            this.setState({message:"Description should not be longer than 500 symbols!"});
            return;
        }

        if(this.state.articleType===0) {
            this.setState({message:"Article type must be chosen!"});
            return
        }

        if(this.state.date==="") {
            this.setState({message:"Date must be chosen!"});
            return;
        }

        let dateArray = this.state.date.split("-",3);
        let date = new Date(parseInt(dateArray[2]),parseInt(dateArray[0])-1, parseInt(dateArray[1]));

        if(date.toDateString()==="Invalid Date"){
            this.setState({message:"Invalid date!"});
            return;
        }

        axios.post('/api/article',{
            articleType:this.state.articleType,
            articleTitle:this.state.title,
            articleDesc:this.state.description,
            postedDate:date.getTime().toString(),
        })
            .then(res=>{
                if(res.data.articleTitle===this.state.title){
                    this.setState({message:"Article saved!"})
                }else{
                    this.setState({message:"Error saving article!"})
                }
            })
            .catch(e=> {
                console.log(e);
            })

    }

    render() {
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create article
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={this.onSubmit}>

                        <Form.Group>
                            <Form.Label>
                                <h5 className='container text-center'>Choose an article type</h5>
                            </Form.Label>
                            <Form.Check
                                type="radio"
                                label="Support issue"
                                name="articleType"
                                onClick={()=>{this.setState({articleType:2})}}
                            />
                            <Form.Check
                                type="radio"
                                label="Technical issue"
                                name="articleType"
                                onClick={()=>{this.setState({articleType:1})}}
                            />
                            <Form.Check
                                type="radio"
                                label="Template"
                                name="articleType"
                                onClick={()=>{this.setState({articleType:3})}}
                            />
                        </Form.Group>
                        <hr/>

                        <Form.Group controlId="title">
                            <Form.Control type="Text" placeholder="Article title" value={this.state.title} onChange={this.onChangeTitle}/>
                        </Form.Group>
                        <hr/>
                        <Form.Group controlId="text">
                            <Form.Control as="textarea" size={3} placeholder="Article description" value={this.state.description} onChange={this.onChangeText}/>
                        </Form.Group>
                        <hr/>
                        <Form.Group controlId="date">
                            <Form.Control type="text" placeholder="Date as (MM-DD-YYYY) (01-25-2022)" value={this.state.date} onChange={this.onChangeDate}/>
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit" className="float-middle" >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <h4>{this.state.message}</h4>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default CreateArticleModal;

