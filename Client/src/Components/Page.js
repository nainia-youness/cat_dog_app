import '../App.css';
import AploadImg from './AploadImg'
import React, { Component } from 'react'
import {Container,Row, Col} from "react-bootstrap";
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

class  Page extends Component{
  constructor(props) {
    super(props)
    this.state={
        imgUrl:'',
        loading: false,
        prediction:''
    }
}

changeImgUrl(item)
{
    this.setState({
        imgUrl:item,
    })
}

async componentDidUpdate(prevProps, prevState){
    if(this.state.imgUrl!=='')
    {
        if(prevState.imgUrl !== this.state.imgUrl)
        {
            await     this.setState({
                            loading:true
                        })
            await axios.post('/api',{'url':this.state.imgUrl})
                .then(res=>{
                    this.setState({
                        prediction:res.data
                    })
                })
                .catch(error=>{
                    console.log(error)
                })
                .finally(()=>
                {
                    setTimeout('', 9000);
                    this.setState({
                        loading:false
                    })
                })
        }
    }   
}

render() {
    return (
        <>
            <Container>
              <Row>
                  <Col>
                    this app classifies airplane, automobile, bird, cat, deer,dog, frog, horse, ship,truck
                  </Col>
              </Row>
              <Row>
                <Col>
                  <AploadImg data={
                            {img:this.state.imgUrl,ChangeImgUrl:this.changeImgUrl.bind(this)}}></AploadImg>
                </Col>
              </Row>
              <Row>
                  <Col>
                        <ClipLoader textAlign='center'
                            size={100}
                            color={"orange"}
                            loading={this.state.loading}
                        />
                  </Col>
              </Row>
              <Row>
                  <Col>
                     <h3>{this.state.prediction}</h3>
                  </Col>
              </Row>
            </Container>
        </>
    )
}
}

export default Page;
