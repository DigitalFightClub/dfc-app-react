import {Heading, Stack} from '@chakra-ui/react';

type GymTileData = {
  datanumber: string;
  dataname: string;
}

export default function GymTile({datanumber, dataname}:GymTileData) {

    return (
        <Stack
        flexDirection='column'
        bg='linear-gradient(95.1deg, rgba(204, 204, 204, 0.1) 0%, rgba(204, 204, 204, 0.05) 101.67%)'
        backdropFilter='blur(40px)'
        boxSizing='border-box'
        px='72px'
        py='24px'
        alignContent='center'
        >
                <Heading
                  variant='header2'
                >
                    {datanumber}
                </Heading>
                <Heading variant='header3' >
                    {dataname}
                </Heading>
        </Stack>
    );
}
