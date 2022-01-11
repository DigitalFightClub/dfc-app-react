import {Text, Stack} from '@chakra-ui/react';

type GymTileData = {
  datanumber: string;
  dataname: string;
}

export default function GymTile({datanumber, dataname}:GymTileData) {

    return (
        <Stack>
                <Text>
                    {datanumber}
                </Text>
                <Text>
                    {dataname}
                </Text>
        </Stack>
    );
}
