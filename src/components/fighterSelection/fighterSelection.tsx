import {useState} from 'react';
import { Grid, Stack, HStack, Button, Collapse } from '@chakra-ui/react';
import FighterTile from '../fighterTile';


export default function FighterSelection() {
    const [showActive, setShowActive] = useState(true);
    const [showRetired, setShowRetired] = useState(false);

    const handleToggle = () => {
        if (showActive === false) {
            setShowActive(true);
            setShowRetired(false);
        } else if (showActive === true) {
            setShowRetired(true);
            setShowActive(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const activeFighterData = {
        name: 'Guy Hawkins',
        country: 'US',
        wins: '37',
        loses: '0',
        age: '33',
        height: '193cm',
        weight: '89kg',
        org: 'Professional Fighting Circuit',
        recruited: '19.10.2021',
        status: 'Active',
        image: '/assets/neon-fighter.svg',
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const retiredFighterData = {
        name: 'Theresa Webb',
        country: 'US',
        wins: '11',
        loses: '4',
        age: '18',
        height: '172cm',
        weight: '59kg',
        org: 'Professional Fighting Circuit',
        recruited: '19.10.2021',
        status: 'Retired',
        image: '/assets/theresa-webb.svg',
    };

    return (
        <Stack minW='100%' >
            <Grid gap='5rem'>
                <HStack minW='100%' gap='0' spacing='0'>
                    <Button w='100%' variant='primary'
                        bg={showActive ? 'primary.500' : 'none'}
                        border='1px gray solid'
                        onClick={handleToggle}>Active Fighters</Button>

                    <Button w='100%' variant='secondary'
                        bg={showRetired ? 'secondary.500' : 'none'}
                        border='1px gray solid'
                        onClick={handleToggle}>Retired Fighters</Button>
                </HStack>

                <Collapse in={showActive} animateOpacity>
                    <Grid
                        templateColumns={{xl: 'repeat(2, 518px)', lg: 'repeat(2, 450px)', md: '1fr', sm: '1fr', base: '1fr'}}
                        w='100%'
                        justifyItems='center'
                        gap='5rem 4rem'
                        pl={{xl: '50px', lg: '50px', md: '0px', sm: '0px', base: '0px'}}
                    >
                        <FighterTile fighterType='active'/>
                        <FighterTile fighterType='active'/>
                        <FighterTile fighterType='active'/>
                        <FighterTile fighterType='active'/>
                    </Grid>
                </Collapse>

                <Collapse in={showRetired} animateOpacity>
                    <Grid
                        templateColumns={{xl: 'repeat(2, 518px)', lg: 'repeat(2, 2fr)', md: '1fr', sm: '1fr', base: '1fr'}}
                        w='100%'
                        justifyItems='center'
                        gap='5rem 4rem'
                        pl={{xl: '50px', lg: '50px', md: '0px', sm: '0px', base: '0px'}}
                    >
                        <FighterTile fighterType='inactive'/>
                    </Grid>
                </Collapse>

            </Grid>
        </Stack>
    );
}
