# Project 2 - Conway's Game of Life
https://peiyao-xin-assignment2.onrender.com/

## Write-up
1. What were some challenges you faced while making this app?<br />
     The first chanllege I encontered was figuring out how the global state and local state work and interact, especially how to maintain a global state of the grid. Additionally, implementing the heatmap is also chanllenging given the color of the cells changes when the cell lives and dies. Lastly, it took me sometime to understand how to use useEffect for the autoplay feature.

2. Given more time, what additional features, functional or design changes would you make?<br />
     If given more time, I'd like to try to implement the Longer Lasting Cells in the Extra Credits. I'd also like to conduct thorough performance testing to optimize the clustering algorithm for better efficiency or implement a more sophisticated method for determing the number of clusters based on the characteristics of data or user preferences for better user experience. Additing a 3D visualization would also be an interesing feature, allowing users to observe the Game of Life in a three-dimensional space with depth and perspective.

3. What assumptions did you make while working on this assignment?<br />
    I assumed that the implementation would be single-threaded, which means all computations and updates on the grid are sequential. I assumed that the grid would be finite in size so that cells at the edges of the grid do not have neighbors beyond the grid boundaries. I assumed that the state of the grid (alive/dead cells) would be stored directly in memory using data structures (using matrix).

4. How long did this assignment take to complete?<br />
    It took me about ~27 hours to complete this project.

## Cluster logic
The game works best when cells are clustered together. In order to perform that, I developed a randomlized algorithm to generate the clusterized grid.

This algorithm involves 2 parts:

1. Find random spot as the cluster starting point.
2. Expand from the cluster starting point with a random path to form different clusters.

### Cluster starting point
The logic here is straightforward, where I define a target probability and a cluster grid with the same size as the actual grid. Using the random generator, I can mark the cell as a cluster starter when the generated number is less than the probability.

Generally with more cluster starting points I have, the grid will have a sparse view. So I need a small probably to ensure I have bigger cluster in general, here a magic number **0.011** was used.

HoIver the low probably cause an issue with a small grid, as there might not be a cluster at all which ends up with nothing on the actual grid. To resolve this, I introduced `expected` cluster size and `actual` cluster size, the probablity will now calculated based on the ratio between the difference of `expected` and `actual` compare to the remaining size of grid.
```
const probability = (expectedClusters - actualClusters) / remainingGrid;
```
This will give us a low porbablity to start with, and increase if the remaining grid becomes small with a large diff beween `expected` and `actual`.

### Expand/generate cluster
Once the starting points are defined, a random path by going around the starting point. Each cluster starting point will be assigned with a number of cells, the total of these cells should stay between **5.5%** to **9.5%**, the 0.5% difference from the actual requirements are buffer for randomization errors to ensure the logic doesn't go below the **5%** or above the **10%** requirements.

When going along the path of generating the cluster, a probability of **55%** was used to determine the cell should be alive or not, this is ensure a interesting pattern is created with less predication. 