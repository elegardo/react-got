import React from 'react'
import { Container, Divider, Label, Header, Segment, Image, Card, Icon } from 'semantic-ui-react'

import { useGOT } from '../hooks/useGOT'

const CharacterContainer = () => {

    const [alive, dead] = useGOT()
    const getColor = (house) => {
        if(house === 'House Stark') return 'black'
        if(house === 'House Lannister') return 'yellow'
        if(house === 'House Targaryen') return 'red'
        if(house === 'House Greyjoy') return 'orange'
        if(house === 'House Baratheon of Dragonstone') return 'yellow'
        return 'grey'
    }

    const getDateFormat = (date) => {
        let dateFormat = new Date(date);
        return `${dateFormat.getDay()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`;
    }

    return (
        <Container>

            <Divider/>
            <Image src={'https://www.designmantic.com/blog/wp-content/uploads/2016/05/Game-of-Thrones-Logo-718x300.jpg'} fluid/>
            <Divider/>

            <Card.Group itemsPerRow={4} stackable>
                {alive.map((item, key) =>
                    <Card key={key} color={getColor(item.house)}>
                        <div className='img' style={{"background-image":`url('${item.image})`}}></div>
                        <Card.Content>
                            <Card.Header>{item.name}</Card.Header>
                            <Card.Description>
                                {item.house &&
                                    <Label as='a' color={getColor(item.house)} ribbon>
                                        <span>{item.house.replace('&apos;','\'')}</span>
                                    </Label>                   
                                }
                            <div>
                                <dl>
                                {item.titles.map((title, key) =>
                                    <dt key={key}>
                                        {title}
                                    </dt>
                                )}
                                </dl>
                            </div>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <a>
                                Updated At: {getDateFormat(item.updatedAt)}
                            </a>
                        </Card.Content>
                    </Card>
                )}
            </Card.Group>

            <Divider/>

            <div>
                {dead.length>0 &&
                    <Header as='h1' block textAlign='center'>
                        <Header.Content>Deads</Header.Content>
                    </Header>
                }
            </div>

            <Card.Group itemsPerRow={6} stackable>
                {dead.map((item, key) =>
                    <Card key={key} raised color={getColor(item.house)} >
                        <Image src={item.image} disabled/>
                        <Card.Content>
                            <Card.Header>{item.name}</Card.Header>
                            {item.house}
                        </Card.Content>
                    </Card>
                )}
            </Card.Group>

        </Container>
    )
}

export default CharacterContainer  