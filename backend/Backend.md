## Creating the Update Endpoint

To create an endpoint that accepts the DTO as the request body, I would create a `CharactersController` and set up a PATCH endpoint. This endpoint takes the `character_id` whose accomplices are to be updated as a URL parameter. Inside the controller, the DTO can be used as the body using the syntax `@Body() updateAccomplicesDTO: UpdateAccomplicesDto`. The logic for the update will be implemented within the controller. The approach involves obtaining the existing accomplices from the table, by querying both `character_id_1` and `character_id_2` for the supplied `character_id` where the relationship is `Accomplice`, checking for duplicates in the provided list, removing excess accomplices, and inserting the new ones.

## Notes on the backend section of the challenge

I am satisfied with the chosen table structure. However, I considered creating two separate tables for Accomplices and Enemies initially. In the end, I opted to stick with a single table and added the 'relationship' column for simplicity. Creating multiple tables for different relationship types could increase complexity for querying. Additionally, if more relationship types were to be added in the future (e.g., family or romantic relationships), it would require creating additional tables, further increasing complexity.

For the challenge, I made the assumption that 'create an endpoint to update the known accomplices of a character' meant supplying a list of characters as the new accomplices. Not much would change if the requirement were to add to the existing list. The main adjustment would involve changing the endpoint type to POST and removing the part about deleting excess `character_id`'s.
