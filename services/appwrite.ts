// track the searches made by user
import { Platform } from 'react-native';
import { Account, Client, ID, Query, TablesDB } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_NAME = process.env.EXPO_PUBLIC_APPWRITE_TABLE_NAME!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

switch(Platform.OS)
{
    case 'ios':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID!)
    
    case 'android':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID!)
}

const account = new Account(client);
const table = new TablesDB(client);

export { account };

export const updateSearchCount = async (movie: Movie) => {
    try{
        const result = await table.listRows({
            databaseId:DATABASE_ID,
            tableId:TABLE_NAME,
            queries:[
                Query.equal('movie_id',movie.id)
            ]
        })
        
        if(result.rows.length > 0){
            const existingMovie = result.rows[0];

            await table.updateRow({
                databaseId:DATABASE_ID,
                tableId:TABLE_NAME,
                rowId:existingMovie.$id,
                data:{
                    count: existingMovie.count + 1
                }
            })
        } else {
            await table.createRow({
                databaseId:DATABASE_ID,
                tableId:TABLE_NAME,
                rowId: ID.unique(),
                data:{
                    movie_id: movie.id,
                    title:movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await table.listRows({
            databaseId:DATABASE_ID,
            tableId:TABLE_NAME,
            queries:[
                Query.limit(5),
                Query.orderDesc('count'),
            ]
        })

        return result.rows as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
