import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TermsContext } from '../context/TermsContext';
import { CategoriesContext } from '../context/CategoriesContext';

export default function StatisticsScreen() {
  const { terms } = useContext(TermsContext);
  const { categories } = useContext(CategoriesContext);

  // Calculate stats
  const stats = useMemo(() => {
    const totalTerms = terms.length;
    const totalCategories = categories.length;

    const perCategory = {};
    categories.forEach(cat => {
      perCategory[cat] = terms.filter(t => t.category === cat).length;
    });

    const sorted = Object.entries(perCategory).sort((a, b) => b[1] - a[1]);

    return {
      totalTerms,
      totalCategories,
      perCategory,
      mostUsed: sorted[0] || null,
      leastUsed: sorted[sorted.length - 1] || null,
      avgDefinitionLength:
        totalTerms === 0
          ? 0
          : Math.round(
              terms.reduce((sum, t) => sum + t.definition.length, 0) /
                totalTerms
            ),
      lastTerm: totalTerms > 0 ? terms[terms.length - 1].term : 'None'
    };
  }, [terms, categories]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Statistics</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Overview</Text>
        <Text style={styles.line}>Total Terms: {stats.totalTerms}</Text>
        <Text style={styles.line}>Total Categories: {stats.totalCategories}</Text>
        <Text style={styles.line}>
          Avg. Definition Length: {stats.avgDefinitionLength} chars
        </Text>
        <Text style={styles.line}>
          Last Added Term: {stats.lastTerm}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Terms Per Category</Text>
        {Object.entries(stats.perCategory).map(([cat, count]) => (
          <Text key={cat} style={styles.line}>
            {cat}: {count}
          </Text>
        ))}
      </View>

      {stats.mostUsed && (
        <View style={styles.card}>
          <Text style={styles.title}>Most Used Category</Text>
          <Text style={styles.line}>
            {stats.mostUsed[0]} ({stats.mostUsed[1]} terms)
          </Text>
        </View>
      )}

      {stats.leastUsed && (
        <View style={styles.card}>
          <Text style={styles.title}>Least Used Category</Text>
          <Text style={styles.line}>
            {stats.leastUsed[0]} ({stats.leastUsed[1]} terms)
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6
  },
  line: {
    fontSize: 16,
    marginBottom: 4
  }
});
