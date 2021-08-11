# Ad Recommendation Platform


Research paper published in Springer Journal. [Link To Paper.](https://link.springer.com/chapter/10.1007/978-981-15-8335-3_48)

Online Videos command a majority portion of the world’s internet traffic. In 2019, consumer Internet video traffic had accounted for 80% of all consumer Internet traffic.
As the consumption of the online videos increases, it is imperative for various platforms to be able to monetize these videos using relevant advertisements.
To maximize revenue from ads, we propose a method of ranking and sorting products based on their relevance to a given video. Using the metadata and captions, the system aims to generate product recommendations that a user may find useful.


## Architecture

![Image](/public/images/major.png)

## Running the Project

- Clone this repository
- Setup and run the frontend

    ```sh
    # In the root directory
    npm install
    npm run dev
    ```

- Setup and run the backend

    ```sh
    cd server
    pip3 install -r requirements.txt
    python3 server.py
    ```

## Screens

![Image](/public/images/project_ss.png)

## Tech Stack

### Frontend
- React
- NextJS
- Typescript

### Backend
- Flask
- Python
- pandas
