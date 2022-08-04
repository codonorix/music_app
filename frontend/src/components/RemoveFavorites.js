import axios from 'axios';

// Delete
export default async function RemoveFavorites(item) {
    try {
        await axios.delete('/favorites', {data: {id: item.id}});
    } catch (e) {
        console.log(e)
    }
}