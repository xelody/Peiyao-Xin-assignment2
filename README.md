# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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