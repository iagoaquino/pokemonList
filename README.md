This applications was developed using Ionic+Angular

## How to install

To install all dependencies you must use the command:

```bash
    npm install
```

You will need the ionic CLI to run the application so if you dont have it yet use this command to install it.

```bash
    npm install -g @ionic/cli
```

## How to run

After installing all dependencies run the command:

```bash
    ionic serve
```

## How it works

**Pokemon list**: To get a list with all the pokemons I used the free PokeAPI to get all pokemons information. I separated this component from the main page to be more easier to manipulate its information and components. This component is quite complex and by separating from the main page I could make it less complex.

**pagination**: to Paginate the information I kept to intergers variable, one for the initial index and other for the final index, so all I need to do is to pass it to the data storager in the moment that I request the information, it don't work togheter with the update data it is called separated from the pokemon list component using the get pokemon information.

**pokemons's information**: To keep the information of every pokemon I created a injectable class DataStorager that is responsible to keep the information that comes from the API. This class have almost all of its atributes and methods as private only the get and update function are public, every time a new batch of pokemon is request the DataStorager is updated with the new information using the update function, to reduce the number of requesition for the API all information are collect when the page is load for the first time then is stored in the localStorage to be reused again in the future without request the API.

**favorites list**: To keep the information of pokemons seted as favorite I created another injectable class FavoriteStorager responsible to keep the list of favorites pokemon. The list atribute is private so It can have a little more security thanks to encapsulation.

**data handler**: To manage the data storagers I create the class DataHandler, it's responsabilite is to be the connection between the storagers and the main page.

**type_filter**: To filter by type I separated the filter in another component nad once the home page receives the event emmiter of type change from this component, it sends to the pokemon list component that using the data_handler pass it to the data_storager that update his data base without changing the local storage. All filter happens after saving the data in the local storager in case is the first time in the page to avoid data missing in the future.

## final considerations

This application was my first connection with angular and ionic so I would it was a pretty good start, thanks to my experience with NestJS I could easily grasp how the Ionic+Angular works.
