import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client = new this.client()
    databases;
    bucket;

    constructor() {
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
          this.databases = new Databases(this.databases)
          this.bucket = new Storage(this.client)
       
      }

      async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
            
        } catch (error) {
            throw error;
            
        }
      }

      async updatePost(slug, {
        title, content, featuredImage, status, userId
      }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
            
        } catch (error) {
            throw error;
        }

      }

      async deletePost(slug){
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )
                return true;
            } catch (error) {
                throw error
                return false;
            }
      }

      async getPost(slug){
        try {
            return await this.databases.getDocument(
               conf.appwriteDatabaseId,
               conf.appwriteCollectionId,
               slug 
            )
            
        } catch (error) {
            conmsole.log("error Appritw")
            
        }
      }

      async getPosts(){
        queries
      }
}

const service = new Service()

export default Service