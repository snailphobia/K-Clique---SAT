#include <iostream>
#include <sstream>
#include <vector>
#include <algorithm>

std::vector<std::vector<int>> V;
int nV = 0, K = 0;

int idx(int i, int j) { return (i - 1) * nV + j; }

int main() {
    std::cin >> nV >> K;
    V.resize(nV);
    for (int i = 0; i < nV; i++) {
        // read a line and split it into numbers
        std::string line;
        std::getline(std::cin, line);
        if (line.size() == 0)
            continue;
        line += "\n";
        std::istringstream iss(line);
        int tmp = 0;
        while (iss >> tmp) {
            V[i - 1].push_back(tmp);
        }
    }

    // checks if a list contains a number
    auto contains = [](const std::vector<int>& v, int x) {
        return std::find(v.begin(), v.end(), x) != v.end();
    };

    // makes the adjacence list symmetrical
    for (int i = nV - 1; i >= 0; i--) {
        for (int j = 0; j < (int) V[i].size(); j++) {
            V[V[i][j] - 1].push_back(i + 1);
        }
    }

    for (int i = 0; i < nV; i++) {
        std::sort(V[i].begin(), V[i].end());
    }

    int total_clauses = 0;
    for (auto v : V) {
        total_clauses += K * (K - 1) * (nV - 1 - v.size());
    }

    total_clauses /= 2;
    total_clauses += K + K * nV * (nV - 1) / 2 + nV * K * (K - 1) / 2;
    
    std::cout << "p cnf " << nV * K << " " << total_clauses << std::endl;
    
    for (int i = 1; i <= K; i++) {
        for (int j = 1; j <= nV; j++) {
            std::cout << idx(i, j) << " ";
        }
        std::cout << "0\n";
    }

    for (int i = 1; i <= K; i++) {
        for (int j = 1; j <= nV; j++) {
            for (int tmp = j + 1; tmp <= nV; tmp++)
                std::cout << "-" << idx(i, j) << " -" << idx(i, tmp) << " 0\n";
        }
    }

    for (int i = 1; i <= nV; i++) {
        for (int j = 1; j <= K; j++) {
            for (int tmp = j + 1; tmp <= K; tmp++)
                std::cout << "-" << idx(j, i) << " -" << idx(tmp, i) << " 0\n";
        }
    }


    // for each pair of vertices, adds a clause if there is no edge between them, to check if at least one is not in the clique
    for (int i = 1; i <= K; i++) {
        for (int j = i + 1; j <= K; j++) {
                for (int u = 1; u <= nV; u++)
                    for (int v = 1; v <= nV; v++)
                        if (u != v && !contains(V[u - 1], v))
                            std::cout << "-" << idx(i, u) << " -" << idx(j, v) << " 0\n";
        }
    }

    return 0;
}