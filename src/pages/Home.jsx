import { Box, Typography } from '@mui/material'
import Layout from 'components/Layout/Layout'
import RoomsList from 'components/RoomsList/RoomsList'

const rooms = [
  {
    id: 1,
    name: 'common one',
  },
  {
    id: 2,
    name: 'common two',
  },
]

function Home() {
  return (
    <Layout>
      <Box sx={{ height: '100%', display: 'flex', gap: 2 }}>
        <Box
          sx={{
            width: { xs: '100%', sm: '45%', lg: '25%' },
            height: '100%',
            bgcolor: 'background.paper',
            overflowY: 'scroll',
          }}
          p={2}
          className='hide-scrollbar'
        >
          <RoomsList rooms={rooms} />
        </Box>

        <Box
          sx={{
            height: '100%',
            width: '100%',
            bgcolor: 'background.paper',
            display: { sm: 'flex', xs: 'none' },
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            component='h1'
            variant='subtitle1'
          >
            choose a room
          </Typography>
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
