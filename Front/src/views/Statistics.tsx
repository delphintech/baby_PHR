import GeneralMetricChart from '../components/Statistics/GeneralMetricChart';
import SummaryCard from '../components/Statistics/SummaryCard';

function Statistics() {

	// TODO: Chart API

	return (
        <section className="p-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <SummaryCard gender="M" />
				<SummaryCard gender="F" />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Global Statistics by Gender</h2>
                <p className="text-gray-600 mb-6">Average growth trends for boys and girls (0–24 months)</p>

                <div className="grid grid-cols-1 gap-6">
                    <GeneralMetricChart metric="weight" />
                    <GeneralMetricChart metric="height" />
                </div>
            </div>
        </section>
    );
}

export default Statistics;
