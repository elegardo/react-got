import React from 'react'
import { Container, Label, Header, Image, Card } from 'semantic-ui-react'
import gotHeader from '../img/got-header.jpg'

import { useGOT } from '../hooks/useGOT'

const CharacterContainer = () => {

    const [alive, dead] = useGOT()
    const getHouseColor = (house) => {
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

            <div className='divider'>
                <Image src={gotHeader} fluid/>
            </div>

            <div className='divider'>
                <Header as='h1' block textAlign='center'>
                    <Header.Content>Alives</Header.Content>
                </Header>
            </div>

            <div className='divider'>
                <Card.Group itemsPerRow={4} doubling stackable>
                    {alive.map((item, key) =>
                        <Card key={key} color={getHouseColor(item.house)}>
                            <div className="crop">
                                <Image 
                                    src={item.image}
                                    className='image'>
                                </Image>
                            </div>
                            <Card.Content>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Description>
                                    {item.house &&
                                        <Label as='a' color={getHouseColor(item.house)} ribbon>
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
            </div>

            <div className='divider'>
                <Header as='h1' block textAlign='center'>
                    <Header.Content>Deads</Header.Content>
                </Header>
            </div>

            <div className='divider'>
                <Card.Group itemsPerRow={6} stackable>
                    {dead.map((item, key) =>
                        <Card key={key} raised color={getHouseColor(item.house)} >
                            <div className="crop-disabled">
                                <Image src={item.image} disabled/>
                            </div>
                            <Card.Content>
                                <Card.Header>{item.name}</Card.Header>
                                {item.house}
                            </Card.Content>
                        </Card>
                    )}
                </Card.Group>
            </div>

        </Container>
    )
}

export default CharacterContainer  