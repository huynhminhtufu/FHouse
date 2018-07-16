import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';

import { Container, Content, H3, List, ListItem, Text, Button, Tab, Tabs, Textarea, Form, Card, CardItem, Icon, Left, Body, View, CheckBox } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageStep: 0
    };
  }

  handleChangeImage(length) {
    let imageStep = this.state.imageStep;

    if (imageStep === length - 1) {
      imageStep = 0;
    } else {
      imageStep = imageStep + 1;
    }

    this.setState({
      imageStep: imageStep
    });
  }

  render() {

    // Props
    const { error, recipes, recipeId } = this.props;

    // Error
    if (error) return <Error content={error} />;

    // Get this Recipe from all recipes
    let recipe = null;
    if (recipeId && recipes) {
      recipe = recipes.find(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
    }

    console.log('Aihih', recipe);

    // Recipe not found
    if (!recipe) return <Error content={ErrorMessages.recipe404} />;

    // Build listing
    const utilities = recipe.utilities.map(item => (
      <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
        <CheckBox checked={true} color="blue" />
        <Body><Text>{item}</Text></Body>
      </ListItem>
    ));

    const equipment = recipe.equipment.map(item => (
      <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
        <CheckBox checked={true} color="green"/>
        <Body><Text>{item}</Text></Body>
      </ListItem>
    ));

    return (
      <Container>
        <Content padder>

          <Card style={{ elevation: 3 }}>
            <CardItem>
              <H3>{recipe.address}</H3>
            </CardItem>
            <CardItem cardBody>
              <TouchableOpacity onPress={() => this.handleChangeImage(recipe.images.length)} style={{ flex: 1 }}>
                <Image style={{ height: 200, width: null, flex: 1 }} source={{ uri: recipe.images[this.state.imageStep] }} />
              </TouchableOpacity>
            </CardItem>
            <CardItem>
              <Icon name="pricetag" style={{ color: '#000' }} />
              <Text>{recipe.price} VND</Text>
              <Spacer size={25} />
              <Icon name="person" style={{ color: '#000' }} />
              <Text>Tu Huynh</Text>
            </CardItem>
          </Card>

          <Tabs>
            <Tab heading="Quick View">
              <View style={{ padding: 20 }}>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>Location</Text>: {recipe.district}, {recipe.city}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>Accommodation</Text>: {recipe.roomates} people
                </Text>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>Gender</Text>: {recipe.gender}
                </Text>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>Room Square</Text>: {recipe.square} m2
                </Text>
                <Spacer size={20} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button info style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='call' />
                    <Text>Call</Text>
                  </Button>
                  <Button warning style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='chatbubbles' />
                    <Text>SMS</Text>
                  </Button>
                </View>
              </View>
            </Tab>
            <Tab heading="Utilities">
              <Text style={{ padding: 10, fontWeight: 'bold', textAlign: 'center' }}>This room has</Text>
              <List>
                {utilities}
              </List>
              <Text style={{ padding: 10, fontWeight: 'bold', textAlign: 'center' }}>Room equipments</Text>
              <List>
                {equipment}
              </List>
            </Tab>
            <Tab heading="Description">
              <View style={{ padding: 20 }}>
                <Text>{recipe.description}</Text>
              </View>
            </Tab>
          </Tabs>
          <Spacer size={20} />
        </Content>
      </Container>
    );
  };
}

RecipeView.propTypes = {
  error: PropTypes.string,
  recipeId: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeView.defaultProps = {
  error: null,
};

export default RecipeView;
